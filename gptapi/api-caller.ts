
export default class ApiCaller {
  
  private _token: string = '';
  constructor(token: string) {
    this._token = token;
  }

  static createClient(token: string):  ApiCaller {
    return new ApiCaller(token);
  };
  
  generateDummyData(config: any, output: OutputType, count: number): Promise<any> {
    return Promise.resolve([
      {
        name: '일민규', 
        email: 'mk1@email.com'
      },
      {
        name: '이민규', 
        email: 'mk2@email.com'
      },
      {
        name: '삼민규', 
        email: 'mk3@email.com'
      }
    ]);
  }
}

export const apiCaller = (token) => (token);

export enum OutputType {
  JSON = 'json', 
  XML = 'xml'
}

