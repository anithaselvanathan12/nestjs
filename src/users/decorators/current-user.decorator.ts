import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    console.log("8888888888888888888888888")
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
