"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type PartnerFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  receiveEmails: boolean;
};

const initialData: PartnerFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  receiveEmails: false,
};

export default function PartnerForm() {
  const [data, setData] = useState<PartnerFormData>(initialData);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    const newValue =
      event.target instanceof HTMLInputElement && event.target.type === "checkbox"
        ? event.target.checked
        : value;
    setData((current) => ({ ...current, [name]: newValue }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedName(data.name);
  }

  return (
    <section id="partners" className="partnerForm">
      <h3>Formulário</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" value={data.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" value={data.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input type="text" id="phone" name="phone" value={data.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensagem</label>
          <br />
          <textarea id="message" name="message" rows={10} value={data.message} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="receiveEmails">Deseja receber nossos e-mails informativos</label>
          <input
            type="checkbox"
            id="receiveEmails"
            name="receiveEmails"
            checked={data.receiveEmails}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {submittedName !== null && (
        <div id="result">
          <h2>Obrigado pelo contato, {submittedName}</h2>
          <p>Ok, já salvamos suas informações, entraremos em contato em breve!</p>
        </div>
      )}
    </section>
  );
}
