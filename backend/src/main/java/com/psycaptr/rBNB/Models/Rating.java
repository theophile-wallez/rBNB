package com.psycaptr.rBNB.Models;

public class Rating {
    double value = 0;
    int amount = 0;

    public Rating(double value, int amount) {
        this.value = value;
        this.amount = amount;
    }

    public Rating() {

    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
