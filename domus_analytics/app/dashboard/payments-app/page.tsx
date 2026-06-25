
import PaymentsApp from '@/app/componentes/dashboard/PaymentsApp';

export const dynamic = 'force-dynamic';


interface PageProps {
  searchParams: Promise<{ view?: string; year?: string }>;
}

export default function PaymentsAppPage({ searchParams }: PageProps) {
  
  return (
    <main>
      <PaymentsApp searchParams={searchParams} />
    </main>
  );
}