import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { ConsultaClientesComponent } from './features/pages/consulta-clientes/consulta-clientes.component';
import { GestionInventarioComponent } from './features/pages/gestion-inventario/gestion-inventario.component';
import { HistorialMedicoComponent } from './features/pages/historial-medico/historial-medico.component';
import { RegistroApareamientosComponent } from './features/pages/registro-apareamientos/registro-apareamientos.component';
import { RegistroGenealogiaComponent } from './features/pages/registro-genealogia/registro-genealogia.component';
import { RegistroProduccionComponent } from './features/pages/registro-produccion/registro-produccion.component';
import { RegistroVacunacionComponent } from './features/pages/registro-vacunacion/registro-vacunacion.component';
import { RegistroVentasComponent } from './features/pages/registro-ventas/registro-ventas.component';
import { ReportesInventarioComponent } from './features/pages/reportes-inventario/reportes-inventario.component';
import { ReportesProduccionComponent } from './features/pages/reportes-produccion/reportes-produccion.component';
import { ReportesSaludComponent } from './features/pages/reportes-salud/reportes-salud.component';
import { OptimizacionApareamientosComponent } from './features/pages/optimizacion-apareamientos/optimizacion-apareamientos.component';


export const routes: Routes = [

    { path: '', component: DashboardComponent },
    { path: 'consulta-clientes', component: ConsultaClientesComponent },
    { path: 'gestion-inventario', component: GestionInventarioComponent },
    { path: 'historial-medico', component: HistorialMedicoComponent },
    { path: 'registro-apareamientos', component: RegistroApareamientosComponent },
    { path: 'registro-genealogia', component: RegistroGenealogiaComponent },
    { path: 'registro-produccion', component: RegistroProduccionComponent },
    { path: 'registro-vacunacion', component: RegistroVacunacionComponent },
    { path: 'registro-ventas', component: RegistroVentasComponent },
    { path: 'reportes-inventario', component: ReportesInventarioComponent },
    { path: 'reportes-produccion', component: ReportesProduccionComponent },
    { path: 'reportes-salud', component: ReportesSaludComponent },
    { path: 'optimizacion-apareamientos', component: OptimizacionApareamientosComponent },

    
    // Aquí puedes agregar más rutas según lo necesites
];