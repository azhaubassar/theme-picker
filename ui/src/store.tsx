import { makeAutoObservable } from "mobx";

class Store {
  colors: [] = [];
  color1: string = "aliceblue";
  color2: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new Store();
export default store;
