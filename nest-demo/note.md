# 笔记

## ts 的 design:paramtypes，通过 Reflect 可以将 ts 类型反射为 js 类型

```typescript
function MyDecorator(options: string) {
  return (target, key, index) => {
    console.log('myDecorator', target, key, index);
    Reflect.defineMetadata(
      'routes',
      {
        [`query:${index}`]: {
          index,
          key,
        },
      },
      target.constructor,
      key,
    );

    const data = Reflect.getMetadata('routes', target.constructor, key);
    const designType = Reflect.getMetadata('design:paramtypes', target, key);
    console.log('zxc', data, designType);
  };
}

/**
 * 例如可以在 MyDecorator 装饰器中获取 getName函数的参数类型
 * 当然源码中是有一个getMetadata方法去获取，然后在 apply 管道的时候，执行管道的transform方法，把 metatype 传进去，所以metatype就是当 前参数的类型
 */
@Controller('/user')
export class CatsController {
  constructor(private userService: UserService, private other: OtherService) {}

  @Get('name')
  getName(@MyDecorator('id') id: string) {
    return this.userService.getName();
  }
}
```
