export default function Progress(
  state = { itemsLoaded: 100, success: true },
  action
) {
  // 处理各种各样的 action
  switch (action.type) {
    case 'PROGRESS':
      return { ...action.payload }
    default:
      // 记得要有默认返回的处理
      return state
  }
}
