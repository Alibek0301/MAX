import { Phone } from 'lucide-react';

import { alibekPhoneNumber } from '../../constants/data';

const CallButton = ({ phoneNumber = alibekPhoneNumber.replace('+', ''), label = '☎️', className = '' }) => (
  <a
    href={`tel:+${phoneNumber}`}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black font-bold hover:bg-accent/90 transition shadow-lg ${className}`}
  >
    <Phone size={18} />
    {label}
  </a>
)

// 🎯 УЛУЧШЕНИЕ 2: WhatsApp QR-код модал
const WhatsAppQRModal = ({ isOpen, onClose, whatsappNumber }) => {
  const qrValue = `https://wa.me/${whatsappNumber}`
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrValue, { width: 220, margin: 1, color: { dark: '#000', light: '#fff' } })
        .catch(() => {
          // fallback if QR generation fails
        })
    }
  }, [isOpen, qrValue])

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

export { CallButton };
