import { useState } from 'react';

export default function useModalContextProvider() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({ title: '', id: '' });
  const [openContrato, setOpenContrato] = useState({
    editar: false,
    novo: false,
  });

  return {
    openContrato,
    setOpenContrato,
    modal,
    setModal,
    openDialog,
    setOpenDialog,
    openEdit,
    setOpenEdit,
    openNew,
    setOpenNew,
    open,
    setOpen,
  };
}
