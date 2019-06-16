import avatarBg from './bg.jpg'

export default () => ({
  root: {},
  avatar: {
    position: 'relative',
    // padding: 20,
    // paddingTop: 60,
    // paddingBottom: 40,
  },
  avatarImg: {
    width: 80,
    height: 80,
    marginBottom: 20,
    zIndex: 1,
  },
  userName: {
    display: 'inline-block',
    color: '#fff',
    zIndex: '1',
  },
  bg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 0',
    backgroundImage: `url(${avatarBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    '&::after': {
      content: '\' \'',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
  },
})
