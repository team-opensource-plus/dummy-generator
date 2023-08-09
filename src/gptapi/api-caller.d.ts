export declare class ApiCaller {
    generateDummyData(config: any, output: OutputType, count: number): Promise<any>;
}
export declare const apiCaller: (token: any) => any;
export declare enum OutputType {
    JSON = "json",
    XML = "xml"
}
