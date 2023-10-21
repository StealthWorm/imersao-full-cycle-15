import { BankAccount } from "../models";

export async function getBankAccount(
  bankAccountId: string
): Promise<BankAccount> {
  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_NEST_API_URL}/bank-accounts/${bankAccountId}`,
    `http://host.docker.internal:3000/bank-accounts/${bankAccountId}`,
    {
      next: {
        // posso ter o revalidate junto com a tag que forçara a rerenderização
        revalidate: 20,
        tags: [`bank-accounts/${bankAccountId}`]
      },
    }
  );
  return response.json();
}
