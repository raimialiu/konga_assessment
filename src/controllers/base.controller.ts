
import Joi, { PartialSchemaMap } from "joi"

export class BaseController {

    protected success<T>(resp, data: T, message: string = "OK", statusCode: number = 200) {
        return resp.status(statusCode).send({
            data,
            message,
            statusCode,
            status: /^2/.test(statusCode.toString())
        })
    }

    protected failedResponse(resp, errors: any, message: string = "REQUEST FAILED",
        statusCode: number = 400) {
        return resp.status(statusCode).send(
            {
                errors,
                message,
                statusCode,
                status: false
            }
        )

    }

    protected defineValidationSchema<T>(schemaPayload: PartialSchemaMap<T>): Joi.ObjectSchema<T> {
        return Joi.object(schemaPayload)
    }

    protected validateObject<T>(schema: Joi.ObjectSchema<T>, payload: unknown) {
        const { error, value } = schema.validate(payload, { "abortEarly": true })

        return {
            error,
            value
        }
    }

    protected handleError(resp, error: Error) {
        const errorMessage = error?.message

        return this.failedResponse(resp, [errorMessage])

    }
}