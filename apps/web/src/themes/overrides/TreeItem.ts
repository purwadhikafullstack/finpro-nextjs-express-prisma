// ==============================|| OVERRIDES - TREE ITEM ||============================== //

export default function TreeItem() {
  return {
    MuiTreeItem: {
      styleOverrides: {
        content: {
          padding: 8
        },
        label: {
          '& svg': {
            width: 20,
            height: 20
          }
        }
      }
    }
  };
}
