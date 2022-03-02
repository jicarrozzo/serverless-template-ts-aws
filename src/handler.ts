import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Response } from './models/system.model';
import { Errors } from './services/helpers/errors.resource';

/**
 * Generic GET 
 * @returns `Response` obj with item if exists
 */
export const get: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (event.pathParameters.id == null || event.pathParameters.id == '') { throw { statusCode: 400, message: Errors.Error_001 }; }

    const item = event.pathParameters.id;

    return new Response(200, { status: 200, message: 'success', item });
  } catch (error) {
    return new Response(200, { status: error.statusCode, message: error.message, error: error });
  }
}
