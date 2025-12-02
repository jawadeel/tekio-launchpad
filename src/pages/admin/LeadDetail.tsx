import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr, nl, enUS } from 'date-fns/locale';
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Users,
  Calendar,
  MessageSquare,
  Sparkles,
  Save,
  Copy,
  Check,
} from 'lucide-react';
import {
  useLead,
  useUpdateLeadStatus,
  useUpdateLeadNotes,
  useGenerateLeadReply,
  useUpdateLeadAISuggestion,
  LeadStatus,
} from '@/hooks/useLeads';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { data: lead, isLoading, error } = useLead(id || '');
  const updateStatus = useUpdateLeadStatus();
  const updateNotes = useUpdateLeadNotes();
  const generateReply = useGenerateLeadReply();
  const updateAISuggestion = useUpdateLeadAISuggestion();

  const [notes, setNotes] = useState('');
  const [notesInitialized, setNotesInitialized] = useState(false);
  const [aiReply, setAiReply] = useState('');
  const [copied, setCopied] = useState(false);

  // Initialize notes from lead data
  if (lead && !notesInitialized) {
    setNotes(lead.notes || '');
    setAiReply(lead.ai_suggestion || '');
    setNotesInitialized(true);
  }

  const getDateLocale = () => {
    switch (language) {
      case 'nl': return nl;
      case 'en': return enUS;
      default: return fr;
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    const colors: Record<LeadStatus, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      proposal: 'bg-purple-100 text-purple-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    if (id) {
      updateStatus.mutate({ id, status: newStatus });
    }
  };

  const handleSaveNotes = () => {
    if (id) {
      updateNotes.mutate({ id, notes });
    }
  };

  const handleGenerateReply = async () => {
    if (!lead) return;
    
    const reply = await generateReply.mutateAsync(lead);
    setAiReply(reply);
    
    // Save to database
    if (id) {
      updateAISuggestion.mutate({ id, ai_suggestion: reply });
    }
  };

  const handleCopyReply = () => {
    navigator.clipboard.writeText(aiReply);
    setCopied(true);
    toast({
      title: t('admin.lead.toast.copied.title'),
      description: t('admin.lead.toast.copied.desc'),
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">{t('admin.lead.loading')}</div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-4">{t('admin.lead.notfound')}</div>
          <Link to="/admin/leads">
            <Button>{t('admin.lead.notfound.back')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/admin/leads">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('admin.lead.back')}
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">
                {lead.company_name || lead.contact_name || lead.email}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('admin.lead.id')}{lead.id.slice(0, 8)}
              </p>
            </div>
            <Badge className={getStatusColor(lead.status)}>
              {t(`admin.lead.status.${lead.status}`)}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lead Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {t('admin.lead.info')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.company')}</div>
                    <div className="font-medium">{lead.company_name || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.contact')}</div>
                    <div className="font-medium">{lead.contact_name || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.email')}</div>
                    <a href={`mailto:${lead.email}`} className="font-medium text-primary hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.phone')}</div>
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`} className="font-medium text-primary hover:underline">
                        {lead.phone}
                      </a>
                    ) : (
                      <div className="font-medium">-</div>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.language')}</div>
                    <div className="font-medium">{t(`admin.lang.${lead.language}`)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.users')}</div>
                    <div className="font-medium">{lead.nb_users_estimate || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.created')}</div>
                    <div className="font-medium">
                      {format(new Date(lead.created_at), 'dd MMMM yyyy à HH:mm', { locale: getDateLocale() })}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">{t('admin.lead.source')}</div>
                    <Badge variant="outline">{t(`admin.source.${lead.source}`)}</Badge>
                  </div>
                </div>
              </div>

              {/* Message */}
              {lead.message && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">{t('admin.lead.message')}</div>
                  <div className="bg-muted/50 p-4 rounded-lg text-foreground whitespace-pre-wrap">
                    {lead.message}
                  </div>
                </div>
              )}
            </div>

            {/* AI Reply Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {t('admin.lead.ai.title')}
                </h2>
                <Button
                  onClick={handleGenerateReply}
                  disabled={generateReply.isPending}
                  variant="outline"
                >
                  {generateReply.isPending ? (
                    t('admin.lead.ai.generating')
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t('admin.lead.ai.generate')}
                    </>
                  )}
                </Button>
              </div>
              
              {aiReply ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap text-sm">
                    {aiReply}
                  </div>
                  <Button onClick={handleCopyReply} variant="secondary" className="w-full">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        {t('admin.lead.ai.copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        {t('admin.lead.ai.copy')}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {t('admin.lead.ai.empty')}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">{t('admin.lead.status.title')}</h3>
              <Select
                value={lead.status}
                onValueChange={(value) => handleStatusChange(value as LeadStatus)}
                disabled={updateStatus.isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{t('admin.lead.status.new')}</SelectItem>
                  <SelectItem value="contacted">{t('admin.lead.status.contacted')}</SelectItem>
                  <SelectItem value="proposal">{t('admin.lead.status.proposal')}</SelectItem>
                  <SelectItem value="won">{t('admin.lead.status.won')}</SelectItem>
                  <SelectItem value="lost">{t('admin.lead.status.lost')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">{t('admin.lead.notes.title')}</h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('admin.lead.notes.placeholder')}
                rows={6}
                className="mb-4"
              />
              <Button
                onClick={handleSaveNotes}
                disabled={updateNotes.isPending}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {updateNotes.isPending ? t('admin.lead.notes.saving') : t('admin.lead.notes.save')}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">{t('admin.lead.actions.title')}</h3>
              <div className="space-y-2">
                <a href={`mailto:${lead.email}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('admin.lead.actions.email')}
                  </Button>
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      {t('admin.lead.actions.call')}
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadDetail;
