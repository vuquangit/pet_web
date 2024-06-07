// svg
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
declare module '*.svg?url'

// sass
declare module '*.scss'

// images
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.gif'
