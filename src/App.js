import { useState, useEffect } from 'react';
import './App.css';
import { jsPDF } from 'jspdf';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] =
    useState('inicio');

  const [currentUser, setCurrentUser] =
    useState(null);

  /* ==================================================
     LOGIN
  ================================================== */

  const handleLogin = (event) => {

    event.preventDefault();

    if (!email || !password) {

      setError(
        'Por favor, completa todos los campos.'
      );

      return;
    }

    setError('');
    setIsLoggedIn(true);
    setCurrentPage('inicio');
  };


  /* ==================================================
     CERRAR SESIÓN
  ================================================== */

  const handleLogout = () => {

    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setError('');
    setCurrentPage('inicio');

  };


  /* ==================================================
     LOGIN
  ================================================== */

  if (!isLoggedIn) {

    return (

      <div className="login-page">

        <div className="login-card">

          <img
            src="/hitek-logo.png"
            alt="HITEK"
            className="login-logo"
          />

          <div className="login-divider"></div>

          <h1>
            HITEK
          </h1>

          <p className="login-subtitle">
            Sistema de gestión de mantenimiento
          </p>


          <form onSubmit={handleLogin}>

            <label htmlFor="email">
              Usuario
            </label>

            <div className="input-container">

              <span>
                👤
              </span>

              <input
                id="email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>


            <label htmlFor="password">
              Contraseña
            </label>

            <div className="input-container">

              <span>
                🔒
              </span>

              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <span>
                👁
              </span>

            </div>


            {error && (

              <p className="login-error">
                {error}
              </p>

            )}


            <div className="forgot-password">
              ¿Olvidaste tu contraseña?
            </div>


            <button type="submit">
              Ingresar
            </button>

          </form>


          <p className="login-footer">
            Sistema de gestión de mantenimiento HITEK
          </p>

        </div>

      </div>

    );

  }


  /* ==================================================
     DASHBOARD
  ================================================== */

  return (

    <Dashboard
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
    />

  );

}


/* ==================================================
   DASHBOARD PRINCIPAL
================================================== */

function Dashboard({
  currentPage,
  setCurrentPage,
  onLogout
}) {

  return (

    <div className="dashboard">


      {/* ==================================================
         BARRA LATERAL
      ================================================== */}

      <aside className="sidebar">


        <div className="sidebar-logo">

          <img
            src="/hitek-logo.png"
            alt="HITEK"
          />

        </div>


        <div className="menu-title">
          MENÚ PRINCIPAL
        </div>


        <nav>


          {/* INICIO */}

          <button
            className={`menu-item ${
              currentPage === 'inicio'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentPage('inicio')
            }
          >

            <span>
              🏠
            </span>

            <span>
              Inicio
            </span>

          </button>


          {/* MANTENIMIENTOS */}

          <button
            className={`menu-item ${
              currentPage === 'mantenimientos'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentPage('mantenimientos')
            }
          >

            <span>
              🔧
            </span>

            <span>
              Registro de mantenimientos
            </span>

          </button>


          {/* CLIENTES */}

          <button
            className={`menu-item ${
              currentPage === 'clientes'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentPage('clientes')
            }
          >

            <span>
              👥
            </span>

            <span>
              Clientes
            </span>

          </button>


          {/* REPORTES */}

          <button
            className={`menu-item ${
              currentPage === 'reportes'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentPage('reportes')
            }
          >

            <span>
              📊
            </span>

            <span>
              Reportes
            </span>

          </button>


          {/* USUARIOS */}

          <button
            className={`menu-item ${
              currentPage === 'usuarios'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentPage('usuarios')
            }
          >

            <span>
              👤
            </span>

            <span>
              Usuarios
            </span>

          </button>


          {/* CONFIGURACIÓN */}

          <button
            className={`menu-item ${
              currentPage === 'configuracion'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentPage('configuracion')
            }
          >

            <span>
              ⚙️
            </span>

            <span>
              Configuración
            </span>

          </button>

        </nav>


        {/* ==================================================
           USUARIO
        ================================================== */}

        <div className="sidebar-bottom">

          <div className="user-info">

            <strong>
              Administrador
            </strong>

            <span>
              Usuario del sistema
            </span>

          </div>


          <button
            className="logout-button"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>

        </div>

      </aside>


      {/* ==================================================
         CONTENIDO
      ================================================== */}

      <main className="dashboard-content">


        {currentPage === 'inicio' && (

          <HomePage
            setCurrentPage={setCurrentPage}
          />

        )}


        {currentPage === 'mantenimientos' && (

          <MaintenancePage />

        )}


        {currentPage === 'reportes' && (

          <ReportsPage />

        )}


        {currentPage === 'clientes' && (

          <ClientsPage />

        )}


        {currentPage === 'usuarios' && (

          <UsersPage />

        )}


        {currentPage === 'configuracion' && (

          <div className="coming-soon-page">

            <div className="coming-soon-icon">
              ⚙️
            </div>

            <h1>
              Configuración
            </h1>

            <p>
              Aquí configuraremos las opciones generales del sistema.
            </p>

            <span>
              Esta sección la construiremos en el siguiente paso.
            </span>

          </div>

        )}

      </main>

    </div>

  );

}


/* ==================================================
   PÁGINA DE INICIO
================================================== */

function HomePage({
  setCurrentPage
}) {


  const maintenances =
    JSON.parse(
      localStorage.getItem('maintenances')
    ) || [];


  /* ==================================================
     ESTADÍSTICAS
  ================================================== */

  const totalMaintenances =
    maintenances.length;


  const completed =
    maintenances.filter(
      (item) =>
        item.estado === 'Completado'
    ).length;


  const pending =
    maintenances.filter(
      (item) =>
        item.estado === 'Pendiente'
    ).length;


  const cancelled =
    maintenances.filter(
      (item) =>
        item.estado === 'Cancelado'
    ).length;


  /* ==================================================
     CLIENTES
  ================================================== */

  const clients =
    JSON.parse(
      localStorage.getItem('clients')
    ) || [];


  const totalClients =
    clients.length;


  return (

    <div className="home-page">


      {/* CABECERA */}

      <div className="dashboard-header">

        <div>

          <h1>
            ¡Bienvenido a HITEK!
          </h1>

          <p>
            Gestiona y consulta los servicios
            de mantenimiento de forma fácil y eficiente.
          </p>

        </div>


        <div className="welcome-icon">
          🔧
        </div>

      </div>


      {/* ESTADÍSTICAS */}

      <div className="stats-grid">


        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div className="stat-information">

            <span>
              Mantenimientos totales
            </span>

            <strong>
              {totalMaintenances}
            </strong>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div className="stat-information">

            <span>
              Completados
            </span>

            <strong>
              {completed}
            </strong>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ⏱
          </div>

          <div className="stat-information">

            <span>
              Pendientes
            </span>

            <strong>
              {pending}
            </strong>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✕
          </div>

          <div className="stat-information">

            <span>
              Cancelados
            </span>

            <strong>
              {cancelled}
            </strong>

          </div>

        </div>

      </div>


      {/* ACCESOS RÁPIDOS */}

      <div className="section-title">

        <h2>
          Accesos rápidos
        </h2>

        <p>
          Selecciona una opción para comenzar.
        </p>

      </div>


      <div className="dashboard-grid">


        {/* REGISTRO */}

        <button
          className="dashboard-card"
          onClick={() =>
            setCurrentPage('mantenimientos')
          }
        >

          <div className="card-icon">
            🔧
          </div>

          <h2>
            Registro de mantenimientos
          </h2>

          <p>
            Registra nuevos servicios de mantenimiento.
          </p>

        </button>


        {/* CLIENTES */}

        <button
          className="dashboard-card"
          onClick={() =>
            setCurrentPage('clientes')
          }
        >

          <div className="card-icon">
            👥
          </div>

          <h2>
            Clientes
          </h2>

          <p>
            Administra la información de tus clientes.
          </p>

          <small>
            {totalClients} clientes registrados
          </small>

        </button>


        {/* REPORTES */}

        <button
          className="dashboard-card"
          onClick={() =>
            setCurrentPage('reportes')
          }
        >

          <div className="card-icon">
            📊
          </div>

          <h2>
            Reportes
          </h2>

          <p>
            Consulta los mantenimientos registrados.
          </p>

          <small>
            {totalMaintenances} reportes
          </small>

        </button>


        {/* USUARIOS */}

        <button
          className="dashboard-card"
          onClick={() =>
            setCurrentPage('usuarios')
          }
        >

          <div className="card-icon">
            👤
          </div>

          <h2>
            Usuarios
          </h2>

          <p>
            Administra los usuarios del sistema.
          </p>

        </button>


        {/* CONFIGURACIÓN */}

        <button
          className="dashboard-card"
          onClick={() =>
            setCurrentPage('configuracion')
          }
        >

          <div className="card-icon">
            ⚙️
          </div>

          <h2>
            Configuración
          </h2>

          <p>
            Personaliza las opciones del sistema.
          </p>

        </button>

      </div>

    </div>

  );

}


/* ==================================================
   REGISTRO DE MANTENIMIENTO
================================================== */

function MaintenancePage() {


  const [formData, setFormData] =
    useState({
      cliente: '',
      fecha: '',
      tipo: '',
      equipo: '',
      diagnostico: '',
      trabajo: '',
      observaciones: '',
      transporte: ''
    });


  const [saved, setSaved] =
    useState(false);


  const [maintenanceNumber, setMaintenanceNumber] =
    useState(() => {

      const savedMaintenances =
        JSON.parse(
          localStorage.getItem('maintenances')
        ) || [];

      return savedMaintenances.length + 1;

    });


  /* CAMBIAR CAMPOS */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData({
      ...formData,
      [name]: value
    });


    setSaved(false);

  };


  /* GUARDAR */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (
      !formData.cliente ||
      !formData.fecha ||
      !formData.tipo ||
      !formData.equipo ||
      !formData.trabajo
    ) {

      alert(
        'Completa los campos obligatorios antes de guardar.'
      );

      return;

    }


    const nuevoMantenimiento = {

      id: Date.now(),

      numero: maintenanceNumber,

      estado: 'Completado',

      ...formData

    };


    const mantenimientosGuardados =
      JSON.parse(
        localStorage.getItem('maintenances')
      ) || [];


    const nuevosMantenimientos = [

      ...mantenimientosGuardados,

      nuevoMantenimiento

    ];


    localStorage.setItem(
      'maintenances',
      JSON.stringify(
        nuevosMantenimientos
      )
    );


    setSaved(true);


    setMaintenanceNumber(
      maintenanceNumber + 1
    );

  };


  /* LIMPIAR */

  const clearForm = () => {

    setFormData({

      cliente: '',
      fecha: '',
      tipo: '',
      equipo: '',
      diagnostico: '',
      trabajo: '',
      observaciones: '',
      transporte: ''

    });


    setSaved(false);

  };


  return (

    <div className="maintenance-page">


      <div className="page-title">

        <div>

          <h1>
            Registro de mantenimiento
          </h1>

          <p>
            Registra la información del servicio técnico realizado.
          </p>

        </div>


        <div className="maintenance-number">

          Mantenimiento #{maintenanceNumber}

        </div>

      </div>


      {saved && (

        <div className="success-message">

          ✓ Mantenimiento registrado correctamente.

        </div>

      )}


      <form
        className="maintenance-form"
        onSubmit={handleSubmit}
      >


        {/* INFORMACIÓN GENERAL */}

        <section className="form-section">

          <h2>
            Información general
          </h2>


          <div className="form-grid">


            <div className="form-group">

              <label>
                Cliente *
              </label>


              <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
              >

                <option value="">
                  Selecciona un cliente
                </option>


                {JSON.parse(
                  localStorage.getItem('clients')
                )?.map(
                  (client) => (

                    <option
                      key={client.id}
                      value={client.nombre}
                    >

                      {client.nombre}

                      {client.empresa
                        ? ` - ${client.empresa}`
                        : ''}

                    </option>

                  )
                )}

              </select>

            </div>


            <div className="form-group">

              <label>
                Fecha *
              </label>


              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Tipo de mantenimiento *
              </label>


              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >

                <option value="">
                  Selecciona un tipo
                </option>

                <option value="Preventivo">
                  Preventivo
                </option>

                <option value="Correctivo">
                  Correctivo
                </option>

                <option value="Predictivo">
                  Predictivo
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>
                Equipo *
              </label>


              <input
                type="text"
                name="equipo"
                placeholder="Equipo o máquina"
                value={formData.equipo}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* DIAGNÓSTICO */}

        <section className="form-section">

          <h2>
            Diagnóstico previo
          </h2>


          <textarea
            name="diagnostico"
            placeholder="Describe el estado inicial del equipo..."
            value={formData.diagnostico}
            onChange={handleChange}
            rows="5"
          />

        </section>


        {/* TRABAJO */}

        <section className="form-section">

          <h2>
            Trabajo realizado *
          </h2>


          <textarea
            name="trabajo"
            placeholder="Describe detalladamente el trabajo realizado..."
            value={formData.trabajo}
            onChange={handleChange}
            rows="6"
          />

        </section>


        {/* OBSERVACIONES */}

        <section className="form-section">

          <h2>
            Observaciones
          </h2>


          <textarea
            name="observaciones"
            placeholder="Escribe cualquier observación adicional..."
            value={formData.observaciones}
            onChange={handleChange}
            rows="5"
          />

        </section>


        {/* TRANSPORTE */}

        <section className="form-section">

          <h2>
            Transporte
          </h2>


          <select
            name="transporte"
            value={formData.transporte}
            onChange={handleChange}
          >

            <option value="">
              Selecciona una opción
            </option>

            <option value="Sí">
              Sí
            </option>

            <option value="No">
              No
            </option>

          </select>

        </section>


        {/* BOTONES */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={clearForm}
          >
            Limpiar
          </button>


          <button
            type="submit"
            className="save-button"
          >
            Guardar mantenimiento
          </button>

        </div>

      </form>

    </div>

  );

}


/* ==================================================
   REPORTES
================================================== */

function ReportsPage() {


  const [reports, setReports] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem('maintenances')
        ) || []
      );

    });


  const [selectedReport, setSelectedReport] =
    useState(null);


  /* ELIMINAR */

  const deleteReport = (id) => {

    const confirmDelete =
      window.confirm(
        '¿Seguro que quieres eliminar este reporte?'
      );


    if (!confirmDelete) {
      return;
    }


    const updatedReports =
      reports.filter(
        (report) =>
          report.id !== id
      );


    localStorage.setItem(
      'maintenances',
      JSON.stringify(
        updatedReports
      )
    );


    setReports(
      updatedReports
    );

  };


  /* ==================================================
     GENERAR PDF
  ================================================== */

  const generatePDF = (report) => {

    const doc = new jsPDF();


    /* ENCABEZADO */

    doc.setFontSize(24);

    doc.setFont(undefined, 'bold');

    doc.text(
      'HITEK',
      20,
      22
    );


    doc.setFontSize(16);

    doc.text(
      'REPORTE DE MANTENIMIENTO',
      20,
      34
    );


    doc.setLineWidth(0.8);

    doc.line(
      20,
      40,
      190,
      40
    );


    /* INFORMACIÓN GENERAL */

    doc.setFontSize(12);

    doc.setFont(undefined, 'bold');

    doc.text(
      'Información del mantenimiento',
      20,
      52
    );


    let y = 63;


    const addField = (
      label,
      value
    ) => {

      doc.setFontSize(10);

      doc.setFont(
        undefined,
        'bold'
      );


      doc.text(
        `${label}:`,
        20,
        y
      );


      doc.setFont(
        undefined,
        'normal'
      );


      const lines =
        doc.splitTextToSize(
          String(
            value ||
            'Sin información'
          ),
          130
        );


      doc.text(
        lines,
        60,
        y
      );


      y += Math.max(
        7,
        lines.length * 6
      );

    };


    addField(
      'N.º de reporte',
      report.numero || report.id
    );


    addField(
      'Cliente',
      report.cliente
    );


    addField(
      'Fecha',
      report.fecha
    );


    addField(
      'Tipo',
      report.tipo
    );


    addField(
      'Equipo',
      report.equipo
    );


    addField(
      'Estado',
      report.estado || 'Pendiente'
    );


    /* DIAGNÓSTICO */

    y += 5;

    doc.setFontSize(12);

    doc.setFont(
      undefined,
      'bold'
    );

    doc.text(
      'Diagnóstico',
      20,
      y
    );


    y += 8;


    doc.setFontSize(10);

    doc.setFont(
      undefined,
      'normal'
    );


    const diagnostico =
      doc.splitTextToSize(
        report.diagnostico ||
          'Sin información',
        170
      );


    doc.text(
      diagnostico,
      20,
      y
    );


    y += Math.max(
      12,
      diagnostico.length * 6
    );


    /* TRABAJO */

    y += 5;

    doc.setFontSize(12);

    doc.setFont(
      undefined,
      'bold'
    );

    doc.text(
      'Trabajo realizado',
      20,
      y
    );


    y += 8;

    doc.setFontSize(10);

    doc.setFont(
      undefined,
      'normal'
    );


    const trabajo =
      doc.splitTextToSize(
        report.trabajo ||
          'Sin información',
        170
      );


    doc.text(
      trabajo,
      20,
      y
    );


    y += Math.max(
      12,
      trabajo.length * 6
    );


    /* OBSERVACIONES */

    y += 5;

    doc.setFontSize(12);

    doc.setFont(
      undefined,
      'bold'
    );

    doc.text(
      'Observaciones',
      20,
      y
    );


    y += 8;

    doc.setFontSize(10);

    doc.setFont(
      undefined,
      'normal'
    );


    const observaciones =
      doc.splitTextToSize(
        report.observaciones ||
          'Sin información',
        170
      );


    doc.text(
      observaciones,
      20,
      y
    );


    y += Math.max(
      12,
      observaciones.length * 6
    );


    /* TRANSPORTE */

    y += 5;

    doc.setFontSize(12);

    doc.setFont(
      undefined,
      'bold'
    );

    doc.text(
      'Transporte',
      20,
      y
    );


    y += 8;

    doc.setFontSize(10);

    doc.setFont(
      undefined,
      'normal'
    );


    doc.text(
      report.transporte ||
        'No especificado',
      20,
      y
    );


    /* PIE */

    doc.setFontSize(9);

    doc.setFont(
      undefined,
      'normal'
    );


    doc.line(
      20,
      275,
      190,
      275
    );


    doc.text(
      'HITEK - Sistema de gestión de mantenimientos',
      20,
      284
    );


    doc.text(
      `Reporte generado: ${new Date().toLocaleDateString()}`,
      20,
      290
    );


    /* GUARDAR */

    doc.save(
      `Reporte-HITEK-${report.numero || report.id}.pdf`
    );

  };


  return (

    <div className="reports-page">


      {/* ==================================================
         MODAL DETALLE
      ================================================== */}

      {selectedReport && (

        <div className="report-modal-overlay">

          <div className="report-modal">


            <div className="report-modal-header">

              <h2>
                Detalle del mantenimiento
              </h2>


              <button
                className="close-report-button"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                ×
              </button>

            </div>


            <div className="report-detail-grid">


              <div>

                <strong>
                  N.º de mantenimiento
                </strong>

                <p>
                  {selectedReport.numero ||
                    selectedReport.id}
                </p>

              </div>


              <div>

                <strong>
                  Cliente
                </strong>

                <p>
                  {selectedReport.cliente}
                </p>

              </div>


              <div>

                <strong>
                  Fecha
                </strong>

                <p>
                  {selectedReport.fecha}
                </p>

              </div>


              <div>

                <strong>
                  Tipo de mantenimiento
                </strong>

                <p>
                  {selectedReport.tipo}
                </p>

              </div>


              <div>

                <strong>
                  Equipo
                </strong>

                <p>
                  {selectedReport.equipo}
                </p>

              </div>


              <div>

                <strong>
                  Estado
                </strong>

                <p>
                  {selectedReport.estado ||
                    'Pendiente'}
                </p>

              </div>


              <div className="report-detail-full">

                <strong>
                  Diagnóstico
                </strong>

                <p>
                  {selectedReport.diagnostico ||
                    'Sin información'}
                </p>

              </div>


              <div className="report-detail-full">

                <strong>
                  Trabajo realizado
                </strong>

                <p>
                  {selectedReport.trabajo ||
                    'Sin información'}
                </p>

              </div>


              <div className="report-detail-full">

                <strong>
                  Observaciones
                </strong>

                <p>
                  {selectedReport.observaciones ||
                    'Sin información'}
                </p>

              </div>


              <div>

                <strong>
                  Transporte
                </strong>

                <p>
                  {selectedReport.transporte ||
                    'No especificado'}
                </p>

              </div>

            </div>


            <div className="report-modal-footer">


              <button
                className="generate-pdf-button"
                onClick={() =>
                  generatePDF(selectedReport)
                }
              >
                Generar PDF
              </button>


              <button
                className="close-report-button-bottom"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                Cerrar
              </button>

            </div>


          </div>

        </div>

      )}


      {/* CABECERA */}

      <div className="page-title">

        <div>

          <h1>
            Reportes
          </h1>

          <p>
            Consulta los mantenimientos registrados.
          </p>

        </div>


        <div className="report-counter">
          Total: {reports.length}
        </div>

      </div>


      {/* LISTA */}

      {reports.length === 0 ? (

        <div className="empty-reports">

          <div className="empty-icon">
            📊
          </div>

          <h2>
            No hay reportes registrados
          </h2>

          <p>
            Cuando registres un mantenimiento,
            aparecerá aquí.
          </p>

        </div>

      ) : (

        <div className="reports-table-container">

          <table className="reports-table">


            <thead>

              <tr>

                <th>
                  N.º
                </th>

                <th>
                  Cliente
                </th>

                <th>
                  Fecha
                </th>

                <th>
                  Tipo
                </th>

                <th>
                  Equipo
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              {reports.map(
                (report) => (

                  <tr key={report.id}>


                    <td>
                      {report.numero ||
                        report.id}
                    </td>


                    <td>
                      {report.cliente}
                    </td>


                    <td>
                      {report.fecha}
                    </td>


                    <td>
                      {report.tipo}
                    </td>


                    <td>
                      {report.equipo}
                    </td>


                    <td>
                      {report.estado ||
                        'Completado'}
                    </td>


                    <td>

                      <div className="report-actions">


                        <button
                          className="view-report-button"
                          onClick={() =>
                            setSelectedReport(
                              report
                            )
                          }
                        >
                          Ver
                        </button>


                        <button
                          className="delete-report-button"
                          onClick={() =>
                            deleteReport(
                              report.id
                            )
                          }
                        >
                          Eliminar
                        </button>


                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}


/* ==================================================
   CLIENTES
================================================== */

function ClientsPage() {


  const [clients, setClients] =
    useState([]);

  const [loadingClients, setLoadingClients] =
    useState(true);

  const [clientError, setClientError] =
    useState('');


  useEffect(() => {

    fetch(
      'http://localhost:3001/api/clientes'
    )

      .then((response) => {

        if (!response.ok) {

          throw new Error(
            'No se pudieron consultar los clientes.'
          );

        }

        return response.json();

      })

      .then((data) => {

        setClients(data);

        setClientError('');

        localStorage.setItem(
          'clients',
          JSON.stringify(data)
        );

      })

      .catch((error) => {

        console.error(
          'Error al consultar clientes:',
          error
        );

        setClientError(
          'No fue posible cargar los clientes del servidor.'
        );

      })

      .finally(() => {

        setLoadingClients(false);

      });

  }, []);


  const [search, setSearch] =
    useState('');


  const [showForm, setShowForm] =
    useState(false);


  const [editingClient, setEditingClient] =
    useState(null);


  const [formData, setFormData] =
    useState({

      nombre: '',
      empresa: '',
      telefono: '',
      correo: '',
      direccion: ''

    });


  /* CAMBIAR CAMPOS */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData({

      ...formData,

      [name]: value

    });

  };


  /* NUEVO */

  const openNewClientForm = () => {

    setEditingClient(null);


    setFormData({

      nombre: '',
      empresa: '',
      telefono: '',
      correo: '',
      direccion: ''

    });


    setShowForm(true);

  };


  /* EDITAR */

  const editClient = (client) => {

    setEditingClient(client);


    setFormData({

      nombre: client.nombre || '',
      empresa: client.empresa || '',
      telefono: client.telefono || '',
      correo: client.correo || '',
      direccion: client.direccion || ''

    });


    setShowForm(true);

  };


  /* GUARDAR */

  const handleSubmit = async (event) => {

    event.preventDefault();


    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.correo
    ) {

      alert(
        'Completa los campos obligatorios.'
      );

      return;

    }


    // Si estamos editando un cliente
    if (editingClient) {

      const updatedClients =
        clients.map(
          (client) =>
            client.id === editingClient.id
              ? {
                  ...client,
                  ...formData
                }
              : client
        );


      localStorage.setItem(
        'clients',
        JSON.stringify(
          updatedClients
        )
      );


      setClients(
        updatedClients
      );


      setShowForm(false);

      setEditingClient(null);


      setFormData({

        nombre: '',
        empresa: '',
        telefono: '',
        correo: '',
        direccion: ''

      });


      return;

    }


    // Registrar cliente nuevo en el backend

    try {

      const response =
        await fetch(
          'http://localhost:3001/api/clientes',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify(
                formData
              )

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.mensaje ||
          'No se pudo registrar el cliente.'
        );

      }


      setClients(
        (previousClients) => [

          ...previousClients,

          data.cliente

        ]
      );


      // Guardamos también en localStorage
      const updatedClients = [

        ...clients,

        data.cliente

      ];

      localStorage.setItem(
        'clients',
        JSON.stringify(
          updatedClients
        )
      );


      alert(
        data.mensaje
      );


      setShowForm(false);

      setEditingClient(null);


      setFormData({

        nombre: '',
        empresa: '',
        telefono: '',
        correo: '',
        direccion: ''

      });


    } catch (error) {

      console.error(
        'Error al registrar el cliente:',
        error
      );


      alert(
        error.message ||
        'No fue posible conectar con el servidor.'
      );

    }

  };


  /* ELIMINAR */

  const deleteClient = (id) => {

    const confirmDelete =
      window.confirm(
        '¿Seguro que quieres eliminar este cliente?'
      );


    if (!confirmDelete) {

      return;

    }


    const updatedClients =
      clients.filter(
        (client) =>
          client.id !== id
      );


    localStorage.setItem(
      'clients',
      JSON.stringify(
        updatedClients
      )
    );


    setClients(
      updatedClients
    );

  };


  /* CANCELAR */

  const cancelForm = () => {

    setShowForm(false);

    setEditingClient(null);


    setFormData({

      nombre: '',
      empresa: '',
      telefono: '',
      correo: '',
      direccion: ''

    });

  };


  /* BUSCAR */

  const filteredClients =
    clients.filter(
      (client) => {

        const text =
          search.toLowerCase();


        return (

          client.nombre
            ?.toLowerCase()
            .includes(text)

          ||

          client.empresa
            ?.toLowerCase()
            .includes(text)

          ||

          client.telefono
            ?.toLowerCase()
            .includes(text)

          ||

          client.correo
            ?.toLowerCase()
            .includes(text)

        );

      }
    );


  return (

    <div className="clients-page">


      {/* CABECERA */}

      <div className="page-title">

        <div>

          <h1>
            Clientes
          </h1>

          <p>
            Administra la información de los clientes de HITEK.
          </p>

        </div>


        <button
          className="new-client-button"
          onClick={openNewClientForm}
        >
          + Nuevo cliente
        </button>

      </div>


      {loadingClients && (

        <p>
          Cargando clientes...
        </p>

      )}


      {clientError && (

        <p style={{ color: 'red' }}>
          {clientError}
        </p>

      )}


      {/* FORMULARIO */}

      {showForm && (

        <div className="client-form-card">


          <div className="client-form-header">

            <div>

              <h2>

                {editingClient
                  ? 'Editar cliente'
                  : 'Nuevo cliente'}

              </h2>

              <p>
                Completa la información del cliente.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSubmit}
            className="client-form"
          >


            <div className="form-group">

              <label>
                Nombre del contacto *
              </label>


              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Empresa
              </label>


              <input
                type="text"
                name="empresa"
                placeholder="Nombre de la empresa"
                value={formData.empresa}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Teléfono *
              </label>


              <input
                type="tel"
                name="telefono"
                placeholder="Número de teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Correo electrónico *
              </label>


              <input
                type="email"
                name="correo"
                placeholder="correo@empresa.com"
                value={formData.correo}
                onChange={handleChange}
              />

            </div>


            <div className="form-group client-address">

              <label>
                Dirección
              </label>


              <input
                type="text"
                name="direccion"
                placeholder="Dirección del cliente"
                value={formData.direccion}
                onChange={handleChange}
              />

            </div>


            <div className="client-form-actions">


              <button
                type="button"
                className="cancel-button"
                onClick={cancelForm}
              >
                Cancelar
              </button>


              <button
                type="submit"
                className="save-button"
              >

                {editingClient
                  ? 'Guardar cambios'
                  : 'Guardar cliente'}

              </button>

            </div>

          </form>

        </div>

      )}


      {/* BUSCADOR */}

      <div className="clients-toolbar">


        <div className="client-search">

          <span>
            🔍
          </span>


          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <div className="client-counter">

          {filteredClients.length}{' '}

          {filteredClients.length === 1
            ? 'cliente'
            : 'clientes'}

        </div>

      </div>


      {/* LISTA */}

      {filteredClients.length === 0 ? (

        <div className="empty-clients">


          <div className="empty-icon">
            👥
          </div>


          <h2>

            {search
              ? 'No se encontraron clientes'
              : 'No hay clientes registrados'}

          </h2>


          <p>

            {search
              ? 'Prueba con otro término de búsqueda.'
              : 'Agrega tu primer cliente para comenzar.'}

          </p>


          {!search && (

            <button
              className="new-client-button"
              onClick={openNewClientForm}
            >
              + Agregar primer cliente
            </button>

          )}

        </div>

      ) : (

        <div className="clients-table-container">

          <table className="clients-table">


            <thead>

              <tr>

                <th>
                  Cliente
                </th>

                <th>
                  Empresa
                </th>

                <th>
                  Teléfono
                </th>

                <th>
                  Correo
                </th>

                <th>
                  Dirección
                </th>

                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredClients.map(
                (client) => (

                  <tr key={client.id}>


                    <td>

                      <strong>
                        {client.nombre}
                      </strong>

                    </td>


                    <td>
                      {client.empresa || '-'}
                    </td>


                    <td>
                      {client.telefono}
                    </td>


                    <td>
                      {client.correo}
                    </td>


                    <td>
                      {client.direccion || '-'}
                    </td>


                    <td>

                      <div className="client-actions">


                        <button
                          className="edit-client-button"
                          onClick={() =>
                            editClient(client)
                          }
                        >
                          Editar
                        </button>


                        <button
                          className="delete-client-button"
                          onClick={() =>
                            deleteClient(
                              client.id
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

} // ← AQUÍ estaba el cierre que faltaba


/* ==================================================
   USUARIOS
================================================== */

function UsersPage() {


  const [users, setUsers] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem('users')
        ) || []
      );

    });


  const [showForm, setShowForm] =
    useState(false);


  const [editingUser, setEditingUser] =
    useState(null);


  const [formData, setFormData] =
    useState({

      nombre: '',
      correo: '',
      contraseña: '',
      rol: 'Técnico'

    });


  /* CAMBIAR CAMPOS */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData({

      ...formData,

      [name]: value

    });

  };


  /* NUEVO */

  const openNewUserForm = () => {

    setEditingUser(null);


    setFormData({

      nombre: '',
      correo: '',
      contraseña: '',
      rol: 'Técnico'

    });


    setShowForm(true);

  };


  /* EDITAR */

  const editUser = (user) => {

    setEditingUser(user);


    setFormData({

      nombre: user.nombre || '',
      correo: user.correo || '',
      contraseña: user.contraseña || '',
      rol: user.rol || 'Técnico'

    });


    setShowForm(true);

  };


  /* GUARDAR */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.contraseña
    ) {

      alert(
        'Completa los campos obligatorios.'
      );

      return;

    }


    let updatedUsers;


    if (editingUser) {

      updatedUsers =
        users.map(
          (user) =>
            user.id === editingUser.id
              ? {
                  ...user,
                  ...formData
                }
              : user
        );

    } else {

      const newUser = {

        id: Date.now(),

        ...formData

      };


      updatedUsers = [

        ...users,

        newUser

      ];

    }


    localStorage.setItem(
      'users',
      JSON.stringify(
        updatedUsers
      )
    );


    setUsers(
      updatedUsers
    );


    setShowForm(false);

    setEditingUser(null);


    setFormData({

      nombre: '',
      correo: '',
      contraseña: '',
      rol: 'Técnico'

    });

  };


  /* ELIMINAR */

  const deleteUser = (id) => {

    const confirmDelete =
      window.confirm(
        '¿Seguro que quieres eliminar este usuario?'
      );


    if (!confirmDelete) {

      return;

    }


    const updatedUsers =
      users.filter(
        (user) =>
          user.id !== id
      );


    localStorage.setItem(
      'users',
      JSON.stringify(
        updatedUsers
      )
    );


    setUsers(
      updatedUsers
    );

  };


  /* CANCELAR */

  const cancelForm = () => {

    setShowForm(false);

    setEditingUser(null);


    setFormData({

      nombre: '',
      correo: '',
      contraseña: '',
      rol: 'Técnico'

    });

  };


  return (

    <div className="users-page">


      {/* CABECERA */}

      <div className="page-title">

        <div>

          <h1>
            Usuarios
          </h1>

          <p>
            Administra los usuarios y permisos de HITEK.
          </p>

        </div>


        <button
          className="new-client-button"
          onClick={openNewUserForm}
        >
          + Nuevo usuario
        </button>

      </div>


      {/* FORMULARIO */}

      {showForm && (

        <div className="client-form-card">


          <div className="client-form-header">

            <div>

              <h2>

                {editingUser
                  ? 'Editar usuario'
                  : 'Nuevo usuario'}

              </h2>


              <p>
                Completa la información del usuario.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSubmit}
            className="client-form"
          >


            <div className="form-group">

              <label>
                Nombre *
              </label>


              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Correo electrónico *
              </label>


              <input
                type="email"
                name="correo"
                placeholder="correo@hitek.com"
                value={formData.correo}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Contraseña *
              </label>


              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Rol *
              </label>


              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
              >

                <option value="Administrador">
                  Administrador
                </option>

                <option value="Técnico">
                  Técnico
                </option>

                <option value="Recepción">
                  Recepción
                </option>

              </select>

            </div>


            <div className="client-form-actions">


              <button
                type="button"
                className="cancel-button"
                onClick={cancelForm}
              >
                Cancelar
              </button>


              <button
                type="submit"
                className="save-button"
              >

                {editingUser
                  ? 'Guardar cambios'
                  : 'Guardar usuario'}

              </button>

            </div>

          </form>

        </div>

      )}


      {/* LISTA */}

      {users.length === 0 ? (

        <div className="empty-clients">


          <div className="empty-icon">
            👤
          </div>


          <h2>
            No hay usuarios registrados
          </h2>


          <p>
            Agrega usuarios para comenzar a gestionar el acceso a HITEK.
          </p>


          <button
            className="new-client-button"
            onClick={openNewUserForm}
          >
            + Agregar primer usuario
          </button>

        </div>

      ) : (

        <div className="clients-table-container">

          <table className="clients-table">


            <thead>

              <tr>

                <th>
                  Usuario
                </th>

                <th>
                  Correo
                </th>

                <th>
                  Rol
                </th>

                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              {users.map(
                (user) => (

                  <tr key={user.id}>


                    <td>

                      <strong>
                        {user.nombre}
                      </strong>

                    </td>


                    <td>
                      {user.correo}
                    </td>


                    <td>
                      {user.rol}
                    </td>


                    <td>

                      <div className="client-actions">


                        <button
                          className="edit-client-button"
                          onClick={() =>
                            editUser(user)
                          }
                        >
                          Editar
                        </button>


                        <button
                          className="delete-client-button"
                          onClick={() =>
                            deleteUser(
                              user.id
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}


/* ==================================================
   EXPORTAR APP
================================================== */

export default App;