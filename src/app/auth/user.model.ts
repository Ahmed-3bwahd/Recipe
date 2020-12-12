export class User {
  constructor(
    public email: string,
    public id : string,
    private _token: string,
    private _tokenExpData: Date
  ){}

  get token(){
    if(!this._tokenExpData || new Date() > this._tokenExpData){
      return null;
    }
    return this._token;
  }
}
