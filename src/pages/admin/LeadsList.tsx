import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr, nl, enUS } from 'date-fns/locale';
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
import { useLanguage } from '@/contexts/LanguageContext';

const LeadsList = () => {
  const { t, language } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const { data: leads, isLoading, error } = useLeads(
    statusFilter === 'all' ? undefined : statusFilter
  );

  const getDateLocale = () => {
    switch (language) {
      case 'nl': return nl;
      case 'en': return enUS;
      default: return fr;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('admin.leads.title')}</h1>
              <p className="text-muted-foreground">{t('admin.leads.subtitle')}</p>
            </div>
            <Link to="/">
              <Button variant="outline">← {t('admin.leads.back')}</Button>
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
                <div className="text-sm text-muted-foreground">{t(`admin.lead.status.${status}`)}</div>
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
              <SelectValue placeholder={t('admin.leads.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.leads.all')}</SelectItem>
              <SelectItem value="new">{t('admin.lead.status.new')}</SelectItem>
              <SelectItem value="contacted">{t('admin.lead.status.contacted')}</SelectItem>
              <SelectItem value="proposal">{t('admin.lead.status.proposal')}</SelectItem>
              <SelectItem value="won">{t('admin.lead.status.won')}</SelectItem>
              <SelectItem value="lost">{t('admin.lead.status.lost')}</SelectItem>
            </SelectContent>
          </Select>
          {statusFilter !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setStatusFilter('all')}>
              {t('admin.leads.reset')}
            </Button>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">{t('admin.leads.loading')}</div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            {t('admin.leads.error')}
          </div>
        ) : !leads || leads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {t('admin.leads.empty')}
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {t('admin.leads.table.date')}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {t('admin.leads.table.company')}
                    </div>
                  </TableHead>
                  <TableHead>{t('admin.leads.table.contact')}</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t('admin.leads.table.email')}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {t('admin.leads.table.users')}
                    </div>
                  </TableHead>
                  <TableHead>{t('admin.leads.table.source')}</TableHead>
                  <TableHead>{t('admin.leads.table.status')}</TableHead>
                  <TableHead className="w-20">{t('admin.leads.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(lead.created_at), 'dd MMM yyyy', { locale: getDateLocale() })}
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
                        {t(`admin.source.${lead.source}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        lead.status === 'proposal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                        lead.status === 'won' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {t(`admin.lead.status.${lead.status}`)}
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
