import ClientsView from '../frontend/clients.jsx'

export default function ClientsPage({ clients, setClients }) {
  return <ClientsView clients={clients} setClients={setClients} />
}
