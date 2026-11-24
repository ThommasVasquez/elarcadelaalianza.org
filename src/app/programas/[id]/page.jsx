import { notFound } from 'next/navigation';
import {
  PROGRAMAS_OFICIALES,
  BINACIONAL_INFO,
  LEGAL_DOCUMENTS,
  FILOSOFIA_INSTITUCIONAL,
} from '../../foundationData';
import ProgramDetailClient from './ProgramDetailClient';

export function generateStaticParams() {
  return PROGRAMAS_OFICIALES.map((prog) => ({
    id: prog.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const program = PROGRAMAS_OFICIALES.find((p) => p.id === id);

  if (!program) {
    return {
      title: 'Programa No Encontrado · Fundación Arca de la Alianza',
    };
  }

  return {
    title: `${program.title} · Programa Oficial — Fundación Arca de la Alianza`,
    description: program.desc,
    openGraph: {
      title: `${program.title} · Fundación Arca de la Alianza`,
      description: program.desc,
      images: [program.img],
    },
  };
}

export default async function ProgramPage({ params }) {
  const { id } = await params;
  const program = PROGRAMAS_OFICIALES.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  return (
    <ProgramDetailClient
      program={program}
      allPrograms={PROGRAMAS_OFICIALES}
      binacionalInfo={BINACIONAL_INFO}
      legalDocs={LEGAL_DOCUMENTS}
      filosofia={FILOSOFIA_INSTITUCIONAL}
    />
  );
}
