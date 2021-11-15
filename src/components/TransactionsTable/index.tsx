import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((data) => (
            <tr key={data.id}>
              <td>{data.title}</td>
              <td className={data.type}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.amount)}
              </td>
              <td>{data.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(data.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
