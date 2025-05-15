import * as yup from 'yup';

export const yupInput = <T extends yup.AnySchema>(schema: T) => {
  return (input: unknown) => {
    return schema.validateSync(input);
  };
};

// Extend tRPC to support Yup
declare module '@trpc/server' {
  interface ProcedureBuilder<TParams extends Record<string, unknown>> {
    input<T extends yup.AnySchema>(schema: T): ProcedureBuilder<{
      _config: TParams['_config'];
      _ctx_out: TParams['_ctx_out'];
      _input_in: T extends yup.Schema<infer U> ? U : never;
      _input_out: T extends yup.Schema<infer U> ? U : never;
      _output_in: TParams['_output_in'];
      _output_out: TParams['_output_out'];
      _meta: TParams['_meta'];
    }>;
  }
}