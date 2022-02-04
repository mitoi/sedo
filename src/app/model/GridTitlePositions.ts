interface TitleMeta {
  col: number,
  row: number,
  componentName: string
}

export interface GridTitleMeta {
  gridCol: number,
  titlePositions: Array<TitleMeta>
}
