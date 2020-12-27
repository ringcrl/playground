// 类型拓展
interface A {
  a: string
}
interface B extends A {
  b: string
}
const b: B = {
  a: 'a',
  b: 'b'
}

// 三目运算符
type Bar<T> = T extends string ? string : never
type C = Bar<'foo'>
type D = Bar<1>

// 类型约束
interface IHasA {
  a: string
}
function logProperty<T extends IHasA>(arg: T) {
  console.log(arg.a)
}
