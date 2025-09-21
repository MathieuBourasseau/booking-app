import Joi from "joi"

export const bookingSchema = Joi.object({
    start_date: Joi.string().pattern(new RegExp("/^\d{4}-\d{2}-\d{2}$/")).required(),
    end_date: Joi.string().pattern(new RegExp("/^\d{4}-\d{2}-\d{2}$/")).required(),
});