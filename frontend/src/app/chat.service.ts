import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatePipe } from '@angular/common';
import { map, finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  getAllData(dbPath: string) {
   return new Promise<any>((resolve)=> {

     //console.log("fetch data");

     this.db.object(dbPath).valueChanges()
      .subscribe(details => {
        resolve(details)
        //console.log(details);
      });


     //this.db.collection('Contrats').valueChanges().subscribe(users => resolve(users));

   })
  }

  sendMessage(contrat:string, sender: string, receiver: string, message: string){
    console.log("try sending message");
    let date = new Date(Date.now());
    let stringDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //console.log(stringDate);
    this.db.list('/Conversations/'+contrat).push({ sender: sender, receiver: receiver, message: message, date: stringDate });

    this.db.object('/Contrats/'+contrat).valueChanges()
     .subscribe(details => {
       //console.log(details);
       if(details == null){
         this.db.object('/Contrats/'+contrat).set({ contractId: contrat, ownerId: sender, tenantId: receiver, date: stringDate });
       }
     });

  }

  sendFile(contractId: string, sender: string, receiver: string, file:File, id:string){
    console.log("try saving file");
    let ref = this.storage.ref('/'+id);
    let task = ref.put(file);

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(downloadURL => {
          let url = downloadURL;
          console.log("url: "+url);
          this.sendMessage(contractId, sender, receiver, url);
        });
      })
    ).subscribe();

    

    
  }


}
