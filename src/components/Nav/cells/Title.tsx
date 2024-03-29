/** @jsx jsx */

import { jsx } from '@emotion/react'
import { Link } from 'gatsby'
import { FC } from 'react'
import { Avatar, Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

type TitleCellProps = {
  title: string
}

const useStyles = makeStyles()(theme => ({
  root: {
    marginInline: '2rem',
    padding: '0.5rem',
    fontWeight: 500,
    transition: 'all 0.15s ease',

    ':hover': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.main,
      scale: '105%',
    },
  },
}))

const TitleCell: FC<TitleCellProps> = ({ title }) => {
  const { classes } = useStyles()
  return (
    <Link to="/">
      {/* <Box className={classes.root}>{title}</Box> */}
      <Avatar
        src="/title.png"
        className={classes.root}
        sx={{
          width: '50px',
          height: '50px',
        }}
      />
    </Link>
  )
}

export default TitleCell
