export class ApiCaller {
  
  async generateDummyData(): Promise<any> {
    return await Promise.resolve([
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

export enum OutputType {
  JSON = 'json', 
  XML = 'xml'
}

