export class Response {
  public body: string;
  public headers: any;
  constructor(public statusCode: number, message: any) {
    this.body = JSON.stringify(message);
    this.headers = {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS 
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
  }
}