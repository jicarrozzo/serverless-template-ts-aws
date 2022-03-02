import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Errors } from "./errors.resource";
/** Dynamo DB Helper */
export class DynamoDBHelper {
  /** Configuration Data */
  private dynamoClient = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

  constructor() { }

  /**
   * Returns a list of items from DB
   * @param queryParams object with query dynamo parmeters
   * @returns `items[]` list of items
   */
  get = async (queryParams: DocumentClient.QueryInput) => {
    try {

      let response = await this.dynamoClient.query(queryParams).promise();
      let databaseItems = [...response.Items];

      // query maxes out at 1MB of data. continue quering if there is more data to read
      while (typeof response.LastEvaluatedKey !== 'undefined') {
        const params = {
          ...queryParams,
          ExclusiveStartKey: response.LastEvaluatedKey,
        };
        response = await this.dynamoClient.query(params).promise();
        databaseItems = [...databaseItems, ...response.Items];
      }

      return databaseItems;
    } catch (error) {
      console.log("Get error", error);
      throw error;
    }
  };

  /**
   * Put new element into the DB
   * @param putItem `Item` to be inserted
   */
  put = async (putItem: DocumentClient.PutItemInput) => {
    try {
      return await this.dynamoClient.put(putItem).promise();
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') error.message = Errors.Error_003;
      console.log("Error entity: " + error);
      throw error;
    }
  };

  /**
   * Update existant element into the DB
   * @param updateParams of the `element` to be updated
   */
  update = async (updateParams: DocumentClient.UpdateItemInput) => {
    try {
      return await this.dynamoClient.update(updateParams).promise();
    } catch (error) {
      console.log("db =>", error);
      throw error;
    }
  };

  /**
   * Delete a element from DB
   * @param deleteParams of the `element` to be deleted
   */
  delete = async (deleteParams: DocumentClient.DeleteItemInput) => {
    try {
      return await this.dynamoClient.delete(deleteParams).promise();
    } catch (error) {
      console.log("db =>", error);
      throw error;
    }
  };
}
