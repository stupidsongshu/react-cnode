export const topicPrimaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#555',
  },
  tab: {
    display: 'inline-block',
    padding: '0 6px',
    marginRight: 10,
    textAlign: 'center',
    fontSize: '12px',
    borderRadius: 3,
    color: '#fff',
    backgroundColor: theme.palette.primary[500],
  },
  top: {
    backgroundColor: theme.palette.secondary[500],
  },
})

export const topicSecondaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
  },
  count: {
    textAlign: 'center',
    marginRight: 20,
  },
  username: {
    marginRight: 20,
    color: '#9e9e9e',
  },
  secondaryColor: {
    color: theme.palette.secondary[300],
  },
})
