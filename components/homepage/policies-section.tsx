import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import UnderlineLink from 'components/ctas/underline';

interface PolicyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const PolicyCard = ({ icon, title, description, linkText, linkHref }: PolicyCardProps) => (
  <div className="flex h-full w-full flex-col border-l-2 border-452-blue-light text-left">
    <div className="border-b-2 border-452-blue-light px-5 py-3">{icon}</div>
    <div className="flex flex-1 flex-col justify-between px-5 pt-3 text-452-blue-light">
      <div className="block">
        <span className="tracking-none mb-2 inline-block font-oswald text-lg font-bold uppercase leading-tight tracking-wide md:mb-4">
          {title}
        </span>
        <p className="font-chakra text-base font-medium leading-tight">{description}</p>
      </div>
      <div className="pt-4">
        <UnderlineLink href={linkHref} className="text-base uppercase text-452-blue-light">
          {linkText} <ArrowRightIcon className="relative -top-[2px] ml-2 inline-block w-6" />
        </UnderlineLink>
      </div>
    </div>
  </div>
);

const PoliciesSection = () => {
  const policies = [
    {
      icon: <TruckIcon className="w-12 stroke-1 text-452-blue-light" />,
      title: 'Envío a todo México',
      description:
        'Nuestro servicio promete una entrega sin problemas de su paquete en cualquier parte de México.',
      linkText: 'Ver Póliza',
      linkHref: '/pages/envios'
    },
    {
      icon: <CreditCardIcon className="w-12 stroke-1 text-452-blue-light" />,
      title: 'Pagos Seguros',
      description:
        '¡Compre con confianza! Nuestro sólido sistema de pago garantiza que sus transacciones sean seguras y que su información esté protegida.',
      linkText: 'Ver Póliza',
      linkHref: '/pages/envios'
    },
    {
      icon: <ReceiptRefundIcon className="w-12 stroke-1 text-452-blue-light" />,
      title: 'Devoluciones en 30 días',
      description:
        '¿No estás satisfecho con tu compra? Disfruta de una devolución en un plazo de 30 días, porque tu satisfacción es nuestra prioridad.',
      linkText: 'Ver Póliza',
      linkHref: '/pages/envios'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-12 stroke-1 text-452-blue-light" />,
      title: 'Atención al cliente 24/7',
      description:
        'Estamos aquí para ayudarte en cualquier momento y en cualquier lugar. Nuestro equipo de atención al cliente está listo para ayudarte las 24 horas del día.',
      linkText: 'Contactanos',
      linkHref: '/pages/envios'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {policies.map((policy, index) => (
        <PolicyCard key={index} {...policy} />
      ))}
    </div>
  );
};

export default PoliciesSection;
