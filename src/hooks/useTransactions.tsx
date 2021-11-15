import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransactions: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionProvider(props: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransactions(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransactions }}>
      {props.children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
