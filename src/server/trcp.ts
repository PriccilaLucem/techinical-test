import { initTRPC } from '@trpc/server';
import { yupInput } from '../utils/yupValidator';
import * as yup from "yup"
const t = initTRPC.create({
  transformer: {
    input: { serialize: yupInput, deserialize: yupInput },
    output: { serialize: yupInput, deserialize: yupInput },
  },
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        yupErrors: error.cause instanceof yup.ValidationError ? (error.cause as yup.ValidationError).errors : null,
      },
    };
  },
});


export const router = t.router;
export const procedure = t.procedure;