import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Cookie, Mail, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy' | 'cookies';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cookies'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="legal-modal-container"
        className="bg-[#FCFCFB] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-[#E7E7E4] shadow-2xl flex flex-col overflow-hidden text-zinc-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E7E4] bg-[#F7F7F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-black">Centro Legal & Cumplimiento</h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> República de Colombia
                </span>
              </div>
              <p className="text-xs text-zinc-500">blockTech • Cali, Valle del Cauca, Colombia</p>
            </div>
          </div>
          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-zinc-600 hover:text-black transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E7E7E4] bg-[#F3F2EF] px-4 sm:px-6 pt-2 overflow-x-auto gap-1">
          <button
            id="tab-terms-btn"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-black text-black bg-[#FCFCFB] rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Términos y Condiciones
          </button>
          <button
            id="tab-privacy-btn"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-black text-black bg-[#FCFCFB] rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Política de Privacidad
          </button>
          <button
            id="tab-cookies-btn"
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'border-black text-black bg-[#FCFCFB] rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Cookie className="w-4 h-4" />
            Política de Cookies
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-zinc-700 leading-relaxed">
          {/* TAB 1: TÉRMINOS Y CONDICIONES */}
          {activeTab === 'terms' && (
            <div id="terms-content" className="space-y-6">
              <div className="bg-zinc-100/80 p-4 rounded-2xl border border-zinc-200/80 text-xs text-zinc-600">
                <p className="font-semibold text-black mb-1">TÉRMINOS Y CONDICIONES DE USO</p>
                <p>Última actualización: Septiembre de 2026 · Aplica la legislación de la República de Colombia</p>
              </div>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">1</span>
                  Aceptación de los Términos
                </h4>
                <p>
                  El acceso y uso de este sitio web, así como la contratación de cualquier servicio ofrecido por blockTech (en adelante "el Prestador"), implican la aceptación plena de estos Términos y Condiciones por parte del usuario o cliente (en adelante "el Cliente").
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">2</span>
                  Identificación del Prestador
                </h4>
                <p>
                  blockTech es operado por [Nombre o Razón Social], identificado con [NIT / Cédula de Ciudadanía], con domicilio en Cali, Valle del Cauca, Colombia. Canal de contacto: WhatsApp +57 316 0424062 y correo <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">soporte@blocktech.agency</a>.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">3</span>
                  Descripción de los Servicios
                </h4>
                <p>
                  blockTech presta servicios de automatización de procesos con inteligencia artificial: contabilidad automática, agentes de contenido omnicanal, chatbots de ventas y copilotos empresariales a la medida. El alcance exacto de cada proyecto (funcionalidades, plazos, integraciones y entregables) se define en una propuesta o cotización específica, que hace parte integral del acuerdo con cada Cliente.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">4</span>
                  Proceso de Contratación
                </h4>
                <p>
                  Agendar una sesión técnica a través del sitio o de WhatsApp no constituye, por sí solo, un contrato de prestación de servicios. El vínculo contractual se perfecciona una vez el Cliente acepta formalmente una propuesta económica y de alcance enviada por blockTech.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">5</span>
                  Condiciones Económicas y Facturación
                </h4>
                <p>
                  Las tarifas, forma de pago y cronograma se establecen en la propuesta de cada proyecto. blockTech factura conforme a la normativa tributaria colombiana vigente ante la DIAN.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">6</span>
                  Obligaciones del Cliente
                </h4>
                <p>
                  El Cliente se compromete a suministrar información veraz y oportuna, otorgar los accesos técnicos necesarios para la implementación (APIs, cuentas de WhatsApp Business, CRM, etc.) y cumplir con los pagos pactados.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">7</span>
                  Límite de Responsabilidad
                </h4>
                <p>
                  blockTech implementa los sistemas conforme al alcance acordado, pero no garantiza resultados específicos de negocio (ventas, ahorro exacto de horas, etc.), ya que estos dependen de factores fuera de su control. blockTech no es responsable por fallas, interrupciones o cambios de política de herramientas de terceros integradas en los flujos (WhatsApp/Meta, proveedores de modelos de IA, DIAN, bancos, plataformas de mensajería), conforme a las reglas generales de responsabilidad contractual del Código Civil colombiano.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">8</span>
                  Propiedad Intelectual
                </h4>
                <p>
                  Los desarrollos a la medida (flujos de automatización, prompts, configuraciones) se rigen por lo pactado en cada propuesta respecto a titularidad y licencia de uso. El software de terceros utilizado (n8n, modelos de IA, etc.) se rige por sus propias licencias, conforme a la Ley 23 de 1982 y la Decisión Andina 351 de 1993 sobre derechos de autor.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">9</span>
                  Protección de Datos Personales
                </h4>
                <p>
                  El tratamiento de los datos personales que el Cliente o el usuario del sitio suministre se rige por la Política de Privacidad de blockTech, descrita más abajo.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">10</span>
                  Derechos del Consumidor
                </h4>
                <p>
                  Cuando resulte aplicable conforme a la Ley 1480 de 2011 (Estatuto del Consumidor), el Cliente cuenta con los derechos de garantía, información veraz y, en ventas a distancia, el derecho de retracto dentro de los términos legales.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">11</span>
                  Ley Aplicable y Jurisdicción
                </h4>
                <p>
                  Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes de Cali, Valle del Cauca, sin perjuicio de acudir a mecanismos de solución de conflictos como la conciliación.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">12</span>
                  Modificaciones
                </h4>
                <p>
                  blockTech podrá actualizar estos Términos en cualquier momento. Los cambios relevantes se publicarán en esta misma página con su fecha de actualización.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES */}
          {activeTab === 'privacy' && (
            <div id="privacy-content" className="space-y-6">
              <div className="bg-zinc-100/80 p-4 rounded-2xl border border-zinc-200/80 text-xs text-zinc-600">
                <p className="font-semibold text-black mb-1">POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES</p>
                <p>Última actualización: Septiembre de 2026 · Ley 1581 de 2012 y Decreto 1074 de 2015</p>
              </div>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">1</span>
                  Responsable del Tratamiento
                </h4>
                <p>
                  [Nombre o Razón Social] (blockTech), identificado con [NIT / Cédula de Ciudadanía], domiciliado en Cali, Valle del Cauca, Colombia, es el Responsable del tratamiento de los datos personales recolectados a través de este sitio. Contacto: <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">soporte@blocktech.agency</a>.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">2</span>
                  Datos que Recolectamos
                </h4>
                <p>
                  Recolectamos los datos que el Titular entrega voluntariamente a través del formulario de reserva de sesión técnica (nombre, empresa, correo electrónico, objetivo de contacto, fecha y hora seleccionadas) y de canales como WhatsApp. También podemos recolectar datos de navegación mediante cookies, descritos en la Política de Cookies.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">3</span>
                  Finalidades del Tratamiento
                </h4>
                <p>
                  Los datos se usan para: gestionar solicitudes de contacto y sesiones técnicas, prestar los servicios contratados, dar soporte, y —solo si el Titular lo autoriza expresamente— enviar comunicaciones comerciales sobre los servicios de blockTech.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">4</span>
                  Autorización
                </h4>
                <p>
                  Al diligenciar cualquier formulario de este sitio o iniciar una conversación por WhatsApp, el Titular otorga su autorización previa, expresa e informada para el tratamiento de sus datos conforme a esta política.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">5</span>
                  Derechos del Titular
                </h4>
                <p>
                  Conforme al artículo 8 de la Ley 1581 de 2012, el Titular tiene derecho a: conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado sobre el uso dado a sus datos; presentar quejas ante la Superintendencia de Industria y Comercio (SIC); revocar la autorización y/o solicitar la supresión de sus datos cuando no exista un deber legal de conservarlos; y acceder de forma gratuita a sus datos.
                </p>
              </section>

              {/* PUNTO DE ELIMINACIÓN Y EJERCICIO DE DERECHOS */}
              <section id="eliminacion-de-datos" className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-3">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">6</span>
                  Cómo Ejercer sus Derechos (Incluye Eliminación y Supresión de Datos)
                </h4>
                <p className="text-zinc-700">
                  Las solicitudes para conocer, actualizar, rectificar o solicitar la <strong>supresión y eliminación de datos</strong> se pueden enviar a <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold font-mono hover:underline">soporte@blocktech.agency</a> o por WhatsApp al <strong className="text-black font-mono">+57 316 0424062</strong>, indicando el derecho que desea ejercer. Se atenderán dentro de los plazos que establece la ley (máximo quince días hábiles según el artículo 15 de la Ley 1581 de 2012).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">7</span>
                  Encargados y Transferencia de Datos
                </h4>
                <p>
                  Para operar, blockTech usa proveedores tecnológicos (hosting, WhatsApp Business/Meta, herramientas de automatización e inteligencia artificial) que actúan como Encargados del tratamiento. Cuando estos proveedores estén ubicados fuera de Colombia, la transferencia se realiza conforme a las garantías del artículo 26 de la Ley 1581 de 2012.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">8</span>
                  Seguridad de la Información
                </h4>
                <p>
                  blockTech implementa medidas técnicas, humanas y administrativas razonables para proteger los datos personales frente a acceso no autorizado, pérdida o alteración.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">9</span>
                  Vigencia de la Base de Datos
                </h4>
                <p>
                  Los datos se conservarán mientras subsista la relación con el Titular y, posteriormente, durante los plazos exigidos por la ley (contable, tributaria, comercial).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">10</span>
                  Menores de Edad
                </h4>
                <p>
                  Los servicios de blockTech están dirigidos a empresas y personas naturales mayores de edad. No recolectamos deliberadamente datos de menores de edad.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">11</span>
                  Autoridad de Control
                </h4>
                <p>
                  La Superintendencia de Industria y Comercio (SIC) es la autoridad competente para vigilar el cumplimiento de la Ley 1581 de 2012 y recibir quejas relacionadas con el tratamiento de datos personales.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">12</span>
                  Modificaciones a esta Política
                </h4>
                <p>
                  blockTech podrá actualizar esta Política en cualquier momento. Los cambios se publicarán en esta misma página con su fecha de actualización.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: POLÍTICA DE COOKIES */}
          {activeTab === 'cookies' && (
            <div id="cookies-content" className="space-y-6">
              <div className="bg-zinc-100/80 p-4 rounded-2xl border border-zinc-200/80 text-xs text-zinc-600">
                <p className="font-semibold text-black mb-1">POLÍTICA DE COOKIES</p>
                <p>Última actualización: Septiembre de 2026</p>
              </div>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">1</span>
                  ¿Qué son las Cookies?
                </h4>
                <p>
                  Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo para recordar información sobre tu visita, mejorar la navegación y, en algunos casos, analizar el uso del sitio.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">2</span>
                  Tipos de Cookies que Usamos
                </h4>
                <div className="space-y-3 pl-2">
                  <p>
                    <strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico del sitio (por ejemplo, recordar el estado de la ventana de reserva).
                  </p>
                  <p>
                    <strong>Cookies de terceros:</strong> pueden originarse en servicios externos incluidos en el sitio (por ejemplo, las tipografías de Google Fonts) o en integraciones que se agreguen en el futuro (analítica, píxeles de redes sociales, widgets de WhatsApp).
                  </p>
                  <p className="text-zinc-600 italic bg-zinc-50 p-3 rounded-xl border border-zinc-200/60">
                    Actualmente el sitio no utiliza cookies de analítica de terceros más allá de las técnicas necesarias para su funcionamiento. Si en el futuro se integran herramientas como Google Analytics o píxeles publicitarios, esta política se actualizará para reflejarlo.
                  </p>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">3</span>
                  Base Legal y Consentimiento
                </h4>
                <p>
                  Cuando una cookie permite identificar a una persona (por ejemplo, asociada a datos que ya nos ha entregado), su tratamiento se rige por la Ley 1581 de 2012 y requiere el consentimiento del Titular, otorgado al continuar navegando en el sitio o al aceptar el aviso correspondiente.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">4</span>
                  Cómo Gestionar o Deshabilitar las Cookies
                </h4>
                <p>
                  Puedes permitir, bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar algunas cookies esenciales puede afectar el funcionamiento del sitio.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">5</span>
                  Cambios en esta Política
                </h4>
                <p>
                  blockTech podrá actualizar esta Política de Cookies en cualquier momento, especialmente al incorporar nuevas herramientas o integraciones. Los cambios se publicarán en esta misma página con su fecha de actualización.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">6</span>
                  Contacto
                </h4>
                <p>
                  Para preguntas sobre esta política, escribe a <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold font-mono hover:underline">soporte@blocktech.agency</a> o por WhatsApp al <strong className="text-black font-mono">+57 316 0424062</strong>.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer info & Actions */}
        <div className="px-6 py-4 border-t border-[#E7E7E4] bg-[#F7F7F5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>Consultas: <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">soporte@blocktech.agency</a></span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-black text-white font-medium text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Entendido y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
