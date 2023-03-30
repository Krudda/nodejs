import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "./ddbClient.js";

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);