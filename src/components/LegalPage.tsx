import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, FileText, Cookie, Mail, Lock, CheckCircle2 } from 'lucide-react';

export type LegalRoute = 'terminos' | 'privacidad' | 'cookies';

interface LegalPageProps {
  route: LegalRoute;
  onNavigateHome: () => void;
  onNavigateTo: (route: LegalRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  route,
  onNavigateHome,
  onNavigateTo
}) => {
  // Asegurar que al cambiar de ruta legal se haga scroll al inicio
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  return (
    <div className="min-h-screen bg-[#FCFCFB] text-zinc-900 font-sans selection:bg-amber-100 selection:text-black flex flex-col">
      {/* Header institucional */}
      <header className="sticky top-0 z-40 bg-[#FCFCFB]/90 backdrop-blur-md border-b border-[#E7E7E4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-black transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="font-mono text-sm font-bold">bT</span>
              </div>
              <span className="font-bold text-black text-sm tracking-tight">blockTech</span>
            </button>
            <span className="text-zinc-300">/</span>
            <span className="text-xs font-medium text-zinc-500">Legal & Cumplimiento</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </header>

      {/* Hero / Título de la página legal */}
      <div className="bg-[#F7F7F5] border-b border-[#E7E7E4] py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>República de Colombia · blockTech</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
            {route === 'terminos' && 'Términos y Condiciones de Uso'}
            {route === 'privacidad' && 'Política de Tratamiento de Datos Personales'}
            {route === 'cookies' && 'Política de Cookies'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500">
            {route === 'terminos' && 'Última actualización: Septiembre de 2026 · Aplica la legislación de la República de Colombia'}
            {route === 'privacidad' && 'Última actualización: Septiembre de 2026 · Conforme a la Ley 1581 de 2012 y Decreto 1074 de 2015'}
            {route === 'cookies' && 'Última actualización: Septiembre de 2026 · Normativa de cookies y navegación'}
          </p>

          {/* Navegación entre documentos legales independientes */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[#E7E7E4]">
            <button
              onClick={() => onNavigateTo('terminos')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                route === 'terminos'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-zinc-600 border border-[#E7E7E4] hover:bg-zinc-50 hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Términos y Condiciones</span>
            </button>
            <button
              onClick={() => onNavigateTo('privacidad')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                route === 'privacidad'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-zinc-600 border border-[#E7E7E4] hover:bg-zinc-50 hover:text-black'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Política de Privacidad</span>
            </button>
            <button
              onClick={() => onNavigateTo('cookies')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                route === 'cookies'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-zinc-600 border border-[#E7E7E4] hover:bg-zinc-50 hover:text-black'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Política de Cookies</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* RUTA 1: TÉRMINOS Y CONDICIONES */}
        {route === 'terminos' && (
          <article className="space-y-8 text-sm text-zinc-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 flex items-start gap-3">
              <Lock className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black">Marco Jurídico:</strong> Estos términos regulan el acceso, navegación y contratación de los servicios de automatización e inteligencia artificial operados por blockTech en la República de Colombia.
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">1</span>
                Aceptación de los Términos
              </h2>
              <p>
                El acceso y uso de este sitio web, así como la contratación de cualquier servicio ofrecido por blockTech (en adelante "el Prestador"), implican la aceptación plena de estos Términos y Condiciones por parte del usuario o cliente (en adelante "el Cliente").
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">2</span>
                Identificación del Prestador
              </h2>
              <p>
                blockTech es operado por [Nombre o Razón Social], identificado con [NIT / Cédula de Ciudadanía], con domicilio en Cali, Valle del Cauca, Colombia. Canal de contacto: WhatsApp +57 316 0424062 y correo <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">soporte@blocktech.agency</a>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">3</span>
                Descripción de los Servicios
              </h2>
              <p>
                blockTech presta servicios de automatización de procesos con inteligencia artificial: contabilidad automática, agentes de contenido omnicanal, chatbots de ventas y copilotos empresariales a la medida. El alcance exacto de cada proyecto (funcionalidades, plazos, integraciones y entregables) se define en una propuesta o cotización específica, que hace parte integral del acuerdo con cada Cliente.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">4</span>
                Proceso de Contratación
              </h2>
              <p>
                Agendar una sesión técnica a través del sitio o de WhatsApp no constituye, por sí solo, un contrato de prestación de servicios. El vínculo contractual se perfecciona una vez el Cliente acepta formalmente una propuesta económica y de alcance enviada por blockTech.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">5</span>
                Condiciones Económicas y Facturación
              </h2>
              <p>
                Las tarifas, forma de pago y cronograma se establecen en la propuesta de cada proyecto. blockTech factura conforme a la normativa tributaria colombiana vigente ante la DIAN.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">6</span>
                Obligaciones del Cliente
              </h2>
              <p>
                El Cliente se compromete a suministrar información veraz y oportuna, otorgar los accesos técnicos necesarios para la implementación (APIs, cuentas de WhatsApp Business, CRM, etc.) y cumplir con los pagos pactados.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">7</span>
                Límite de Responsabilidad
              </h2>
              <p>
                blockTech implementa los sistemas conforme al alcance acordado, pero no garantiza resultados específicos de negocio (ventas, ahorro exacto de horas, etc.), ya que estos dependen de factores fuera de su control. blockTech no es responsable por fallas, interrupciones o cambios de política de herramientas de terceros integradas en los flujos (WhatsApp/Meta, proveedores de modelos de IA, DIAN, bancos, plataformas de mensajería), conforme a las reglas generales de responsabilidad contractual del Código Civil colombiano.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">8</span>
                Propiedad Intelectual
              </h2>
              <p>
                Los desarrollos a la medida (flujos de automatización, prompts, configuraciones) se rigen por lo pactado en cada propuesta respecto a titularidad y licencia de uso. El software de terceros utilizado (n8n, modelos de IA, etc.) se rige por sus propias licencias, conforme a la Ley 23 de 1982 y la Decisión Andina 351 de 1993 sobre derechos de autor.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">9</span>
                Protección de Datos Personales
              </h2>
              <p>
                El tratamiento de los datos personales que el Cliente o el usuario del sitio suministre se rige por la Política de Privacidad de blockTech, descrita más abajo.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">10</span>
                Derechos del Consumidor
              </h2>
              <p>
                Cuando resulte aplicable conforme a la Ley 1480 de 2011 (Estatuto del Consumidor), el Cliente cuenta con los derechos de garantía, información veraz y, en ventas a distancia, el derecho de retracto dentro de los términos legales.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">11</span>
                Ley Aplicable y Jurisdicción
              </h2>
              <p>
                Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes de Cali, Valle del Cauca, sin perjuicio de acudir a mecanismos de solución de conflictos como la conciliación.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">12</span>
                Modificaciones
              </h2>
              <p>
                blockTech podrá actualizar estos Términos en cualquier momento. Los cambios relevantes se publicarán en esta misma página con su fecha de actualización.
              </p>
            </section>
          </article>
        )}

        {/* RUTA 2: POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES */}
        {route === 'privacidad' && (
          <article className="space-y-8 text-sm text-zinc-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black">Régimen Constitucional de Hábeas Data:</strong> Cumplimiento de la Ley 1581 de 2012 y el Decreto 1074 de 2015 sobre la recolección, almacenamiento, uso y supresión de datos personales en Colombia.
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">1</span>
                Responsable del Tratamiento
              </h2>
              <p>
                [Nombre o Razón Social] (blockTech), identificado con [NIT / Cédula de Ciudadanía], domiciliado en Cali, Valle del Cauca, Colombia, es el Responsable del tratamiento de los datos personales recolectados a través de este sitio. Contacto: <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">soporte@blocktech.agency</a>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">2</span>
                Datos que Recolectamos
              </h2>
              <p>
                Recolectamos los datos que el Titular entrega voluntariamente a través del formulario de reserva de sesión técnica (nombre, empresa, correo electrónico, objetivo de contacto, fecha y hora seleccionadas) y de canales como WhatsApp. También podemos recolectar datos de navegación mediante cookies, descritos en la Política de Cookies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">3</span>
                Finalidades del Tratamiento
              </h2>
              <p>
                Los datos se usan para: gestionar solicitudes de contacto y sesiones técnicas, prestar los servicios contratados, dar soporte, y —solo si el Titular lo autoriza expresamente— enviar comunicaciones comerciales sobre los servicios de blockTech.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">4</span>
                Autorización
              </h2>
              <p>
                Al diligenciar cualquier formulario de este sitio o iniciar una conversación por WhatsApp, el Titular otorga su autorización previa, expresa e informada para el tratamiento de sus datos conforme a esta política.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">5</span>
                Derechos del Titular
              </h2>
              <p>
                Conforme al artículo 8 de la Ley 1581 de 2012, el Titular tiene derecho a: conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado sobre el uso dado a sus datos; presentar quejas ante la Superintendencia de Industria y Comercio (SIC); revocar la autorización y/o solicitar la supresión de sus datos cuando no exista un deber legal de conservarlos; y acceder de forma gratuita a sus datos.
              </p>
            </section>

            {/* SECCIÓN DESTACADA: EJERCICIO Y ELIMINACIÓN DE DATOS */}
            <section id="eliminacion-de-datos" className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center shrink-0">6</span>
                Cómo Ejercer sus Derechos (Incluye Solicitud de Eliminación y Supresión)
              </h2>
              <p className="text-zinc-700">
                Las solicitudes para conocer, actualizar, rectificar o solicitar la <strong>supresión y eliminación definitiva de datos</strong> se pueden enviar a <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold font-mono hover:underline">soporte@blocktech.agency</a> o por WhatsApp al <strong className="text-black font-mono">+57 316 0424062</strong>, indicando el derecho que desea ejercer.
              </p>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80 text-xs text-zinc-600">
                <strong>Plazo de respuesta legal:</strong> Se atenderán dentro de los plazos que establece la ley (máximo quince (15) días hábiles según el artículo 15 de la Ley 1581 de 2012).
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">7</span>
                Encargados y Transferencia de Datos
              </h2>
              <p>
                Para operar, blockTech usa proveedores tecnológicos (hosting, WhatsApp Business/Meta, herramientas de automatización e inteligencia artificial) que actúan como Encargados del tratamiento. Cuando estos proveedores estén ubicados fuera de Colombia, la transferencia se realiza conforme a las garantías del artículo 26 de la Ley 1581 de 2012.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">8</span>
                Seguridad de la Información
              </h2>
              <p>
                blockTech implementa medidas técnicas, humanas y administrativas razonables para proteger los datos personales frente a acceso no autorizado, pérdida o alteración.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">9</span>
                Vigencia de la Base de Datos
              </h2>
              <p>
                Los datos se conservarán mientras subsista la relación con el Titular y, posteriormente, durante los plazos exigidos por la ley (contable, tributaria, comercial).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">10</span>
                Menores de Edad
              </h2>
              <p>
                Los servicios de blockTech están dirigidos a empresas y personas naturales mayores de edad. No recolectamos deliberadamente datos de menores de edad.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">11</span>
                Autoridad de Control
              </h2>
              <p>
                La Superintendencia de Industria y Comercio (SIC) es la autoridad competente para vigilar el cumplimiento de la Ley 1581 de 2012 y recibir quejas relacionadas con el tratamiento de datos personales.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">12</span>
                Modificaciones a esta Política
              </h2>
              <p>
                blockTech podrá actualizar esta Política en cualquier momento. Los cambios se publicarán en esta misma página con su fecha de actualización.
              </p>
            </section>
          </article>
        )}

        {/* RUTA 3: POLÍTICA DE COOKIES */}
        {route === 'cookies' && (
          <article className="space-y-8 text-sm text-zinc-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 flex items-start gap-3">
              <Cookie className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black">Uso Transparente:</strong> Conoce cómo y para qué se utilizan cookies y tecnologías de almacenamiento local en el sitio web de blockTech.
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">1</span>
                ¿Qué son las Cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo para recordar información sobre tu visita, mejorar la navegación y, en algunos casos, analizar el uso del sitio.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">2</span>
                Tipos de Cookies que Usamos
              </h2>
              <div className="space-y-3 pl-2">
                <p>
                  <strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico del sitio (por ejemplo, recordar el estado de la ventana de reserva).
                </p>
                <p>
                  <strong>Cookies de terceros:</strong> pueden originarse en servicios externos incluidos en el sitio (por ejemplo, las tipografías de Google Fonts) o en integraciones que se agreguen en el futuro (analítica, píxeles de redes sociales, widgets de WhatsApp).
                </p>
                <p className="text-zinc-600 italic bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
                  Actualmente el sitio no utiliza cookies de analítica de terceros más allá de las técnicas necesarias para su funcionamiento. Si en el futuro se integran herramientas como Google Analytics o píxeles publicitarios, esta política se actualizará para reflejarlo.
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">3</span>
                Base Legal y Consentimiento
              </h2>
              <p>
                Cuando una cookie permite identificar a una persona (por ejemplo, asociada a datos que ya nos ha entregado), su tratamiento se rige por la Ley 1581 de 2012 y requiere el consentimiento del Titular, otorgado al continuar navegando en el sitio o al aceptar el aviso correspondiente.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">4</span>
                Cómo Gestionar o Deshabilitar las Cookies
              </h2>
              <p>
                Puedes permitir, bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar algunas cookies esenciales puede afectar el funcionamiento del sitio.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">5</span>
                Cambios en esta Política
              </h2>
              <p>
                blockTech podrá actualizar esta Política de Cookies en cualquier momento, especialmente al incorporar nuevas herramientas o integraciones. Los cambios se publicarán en esta misma página con su fecha de actualización.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0">6</span>
                Contacto
              </h2>
              <p>
                Para preguntas sobre esta política, escribe a <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold font-mono hover:underline">soporte@blocktech.agency</a> o por WhatsApp al <strong className="text-black font-mono">+57 316 0424062</strong>.
              </p>
            </section>
          </article>
        )}
      </main>

      {/* Footer de la página legal */}
      <footer className="border-t border-[#E7E7E4] bg-[#F7F7F5] py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>Consultas legales: <a href="mailto:soporte@blocktech.agency" className="font-semibold text-black hover:underline">soporte@blocktech.agency</a></span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateTo('terminos')}
              className={`hover:text-black transition-colors cursor-pointer ${route === 'terminos' ? 'text-black font-bold underline' : ''}`}
            >
              Términos
            </button>
            <button
              onClick={() => onNavigateTo('privacidad')}
              className={`hover:text-black transition-colors cursor-pointer ${route === 'privacidad' ? 'text-black font-bold underline' : ''}`}
            >
              Privacidad
            </button>
            <button
              onClick={() => onNavigateTo('cookies')}
              className={`hover:text-black transition-colors cursor-pointer ${route === 'cookies' ? 'text-black font-bold underline' : ''}`}
            >
              Cookies
            </button>
            <button
              onClick={onNavigateHome}
              className="text-black font-semibold hover:underline cursor-pointer ml-2"
            >
              Inicio ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
