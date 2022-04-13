package com.psycaptr.rBNB.Models;

public class Password {
    private String salt;
    private String hash;

    public Password(String salt, String hash) {
        this.salt = salt;
        this.hash = hash;
    }

    public Password() {

    }


    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}
