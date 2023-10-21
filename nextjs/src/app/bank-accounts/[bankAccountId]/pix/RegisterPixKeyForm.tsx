"use client";

import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "../../../../components/Card";
import { createPixKeyAction } from "./create-pix-key.action";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterPixKeyForm({
  bankAccountId,
}: {
  bankAccountId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // o método .bind() é usado para criar uma nova função que tem um valor específico como seu contexto 
  // (ou valor this). Isso é útil quando você deseja garantir que uma função seja executada com um contexto 
  // específico, independentemente de como ela seja chamada.
  //  no caso estamos carregando o createPixKeyActionsomente com o Id primeiro, e depois o chamamos apenas com o formData
  const createPixKeyActionWithBankAccountId = createPixKeyAction.bind(
    null,
    bankAccountId
  );
  // const objeto = {
  //   valor: 42,
  //   mostrarValor: function() {
  //     console.log(this.valor);
  //   }
  // };
  // const outraFuncao = objeto.mostrarValor;
  // const funcaoVinculada = outraFuncao.bind(objeto);
  // outraFuncao(); // Isso resultará em "undefined" porque 'this' não está definido.
  // funcaoVinculada(); // Isso resultará em "42" porque 'this' está vinculado ao objeto

  async function onSubmit(formData: FormData) {
    await createPixKeyActionWithBankAccountId(formData);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Typography variant="h5">Cadastrar chaves pix</Typography>
      <Card>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          action={onSubmit}
        >
          <FormControl sx={{ mt: 2 }} required>
            <FormLabel>Escolha um tipo de chave</FormLabel>
            <RadioGroup name="kind">
              <FormControlLabel value="cpf" control={<Radio />} label="CPF" />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="E-mail"
              />
            </RadioGroup>
          </FormControl>
          <TextField name="key" label="Digite sua chave pix" margin="normal" />
          <Box display={"flex"} gap={1} mt={2}>
            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
            <Button type="button" variant="contained" color="secondary" onClick={() => {
              router.push(`/bank-accounts/${bankAccountId}/dashboard`);
            }}>
              Voltar
            </Button>
          </Box>
        </form>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Chave pix cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
