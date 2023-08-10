export class ApiCaller {

  static createClient(token: string):  ApiCaller {
    return new ApiCaller();
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

export const apiCaller = (token: any) => (token);

export enum OutputType {
  JSON = 'json', 
  XML = 'xml'
}