"use client"

import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from './firebase';
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore';
import { useEffect, useState} from 'react';

// const item = [
//   'tomato',
//   'potato',
//   'onion',
//   'garlic',
//   'ginger',
//   'carrot',
//   'lettuce',
//   'soy',
//   'cucumber'
// ]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap: 1,
  display: 'flex',
  flexDirection: 'column',
};


export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'))
      const docs = await getDocs(snapshot)
      const pantryList = []
      docs.forEach((doc) => {
        pantryList.push({ name: doc.id, ...doc.data() })
      })
      console.log(pantryList)
      setPantry(pantryList)
  }
  
  useEffect(() => {
    updatePantry()
  }, [])

  const normalizeItemName = (item) => {

    return item.charAt(0).toUpperCase().trim() + item.slice(1).toLowerCase().trim();
  }


  const addItem = async (item) => {
    const fixedItem = normalizeItemName(item)
    const docRef = doc(collection(firestore, 'pantry'), fixedItem)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, { count: count + 1 })
    }
    else {
      await setDoc(docRef, {count: 1})
    }
    await updatePantry()
    
  }

  const removeItem = async (item) => {
    const fixedItem = normalizeItemName(item)
    const docRef = doc(collection(firestore, 'pantry'), fixedItem)
    const docSnap = await (getDoc(docRef))
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap = {2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width='100%' height='55px' direction={'row'} spacing={2}>
            <TextField id='outlined-basic'
              label='Item'
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value) } />
            <Button variant="contained"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
          
        </Box>
      </Modal>
      <Button variant='contained'
      onClick={handleOpen}
      >Add</Button>
      
      <Box border={'2px solid #333'}>

      <Box width="800px" height="70px" bgcolor={'#60f565'}>
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Pantry Items
          </Typography>
          
      </Box>
      <Stack width="800px" height="300px" spacing={3} overflow={'auto'}>
          {pantry.map(({ name, count }) => (
            <Stack key={name} direction={'row'} spacing={2} justifyContent={'center'} alignContent={'space-between'}>
            <Box
              key={name}
              width="100%"
              height="100px"
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              >
                <Stack direction="row" spacing={10} alignItems="center">
                  <Typography
                    variant={'h3'} color={'#333'} textAlign={'center'}>
                    {normalizeItemName(name)}
                  </Typography>  
                  <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                    Quantity: {count}
                  </Typography>
                </Stack>
            </Box>
              <Button variant='contained' color = 'error' onClick={() => removeItem(name) }>
                Remove
            </Button>
          </Stack>
          ))}
        

        </Stack>
            
      </Box>
      
      </Box>
  );
}
