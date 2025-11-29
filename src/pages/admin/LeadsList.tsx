import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Eye, Users, Building2, Mail, Calendar, Filter } from 'lucide-react';
import { useLeads, LeadStatus } from '@/hooks/useLeads';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const statusLabels: Record<LeadStatus, string> = {
  new: 'Nouveau',
  contacted: 'Contacté',
  proposal: 'Proposition',
  won: 'Gagné',
  lost: 'Perdu',
};

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  proposal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  won: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const sourceLabels: Record<string, string> = {
  home: 'Accueil',
  audit_page: 'Page Audit',
  contact_page: 'Page Contact',
  pricing_page: 'Page Tarifs',
};

const LeadsList = () => {
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const { data: leads, isLoading, error } = useLeads(
    statusFilter === 'all' ? undefined : statusFilter
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestion des Leads</h1>
              <p className="text-muted-foreground">Tekio Admin</p>
            </div>
            <Link to="/">
              <Button variant="outline">← Retour au site</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {(['new', 'contacted', 'proposal', 'won', 'lost'] as LeadStatus[]).map((status) => {
            const count = leads?.filter((l) => l.status === status).length || 0;
            return (
              <div
                key={status}
                className="bg-card border border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => setStatusFilter(status === statusFilter ? 'all' : status)}
              >
                <div className="text-2xl font-bold text-foreground">{count}</div>
                <div className="text-sm text-muted-foreground">{statusLabels[status]}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as LeadStatus | 'all')}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les leads</SelectItem>
              <SelectItem value="new">Nouveau</SelectItem>
              <SelectItem value="contacted">Contacté</SelectItem>
              <SelectItem value="proposal">Proposition</SelectItem>
              <SelectItem value="won">Gagné</SelectItem>
              <SelectItem value="lost">Perdu</SelectItem>
            </SelectContent>
          </Select>
          {statusFilter !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setStatusFilter('all')}>
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Chargement...</div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            Erreur lors du chargement des leads
          </div>
        ) : !leads || leads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucun lead trouvé
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Entreprise
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Utilisateurs
                    </div>
                  </TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(lead.created_at), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell className="font-medium">
                      {lead.company_name || '-'}
                    </TableCell>
                    <TableCell>{lead.contact_name || '-'}</TableCell>
                    <TableCell className="text-sm">{lead.email}</TableCell>
                    <TableCell className="text-center">
                      {lead.nb_users_estimate || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {sourceLabels[lead.source] || lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[lead.status]}>
                        {statusLabels[lead.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/leads/${lead.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default LeadsList;
