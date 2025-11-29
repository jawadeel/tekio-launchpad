import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
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

const statusLabels: Record<LeadStatus, string> = {
  new: 'Nouveau',
  contacted: 'Contacté',
  proposal: 'Proposition',
  won: 'Gagné',
  lost: 'Perdu',
};

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  proposal: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const sourceLabels: Record<string, string> = {
  home: 'Accueil',
  audit_page: 'Page Audit',
  contact_page: 'Page Contact',
  pricing_page: 'Page Tarifs',
};

const languageLabels: Record<string, string> = {
  FR: 'Français',
  NL: 'Nederlands',
  EN: 'English',
};

const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
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
      title: "Copié !",
      description: "La réponse a été copiée dans le presse-papier.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-4">Lead non trouvé</div>
          <Link to="/admin/leads">
            <Button>Retour à la liste</Button>
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
                Retour
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">
                {lead.company_name || lead.contact_name || lead.email}
              </h1>
              <p className="text-sm text-muted-foreground">
                Lead #{lead.id.slice(0, 8)}
              </p>
            </div>
            <Badge className={statusColors[lead.status]}>
              {statusLabels[lead.status]}
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
                Informations du lead
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Entreprise</div>
                    <div className="font-medium">{lead.company_name || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Contact</div>
                    <div className="font-medium">{lead.contact_name || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a href={`mailto:${lead.email}`} className="font-medium text-primary hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Téléphone</div>
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
                    <div className="text-sm text-muted-foreground">Langue</div>
                    <div className="font-medium">{languageLabels[lead.language]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Nb utilisateurs</div>
                    <div className="font-medium">{lead.nb_users_estimate || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Date de création</div>
                    <div className="font-medium">
                      {format(new Date(lead.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Source</div>
                    <Badge variant="outline">{sourceLabels[lead.source] || lead.source}</Badge>
                  </div>
                </div>
              </div>

              {/* Message */}
              {lead.message && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Message</div>
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
                  Réponse IA suggérée
                </h2>
                <Button
                  onClick={handleGenerateReply}
                  disabled={generateReply.isPending}
                  variant="outline"
                >
                  {generateReply.isPending ? (
                    'Génération...'
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {lead.language === 'NL' ? 'Antwoord genereren' : 
                       lead.language === 'EN' ? 'Generate reply' : 
                       'Générer une réponse'}
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
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copier la réponse
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Cliquez sur "Générer une réponse" pour obtenir une suggestion d'email personnalisée.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Statut</h3>
              <Select
                value={lead.status}
                onValueChange={(value) => handleStatusChange(value as LeadStatus)}
                disabled={updateStatus.isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="contacted">Contacté</SelectItem>
                  <SelectItem value="proposal">Proposition</SelectItem>
                  <SelectItem value="won">Gagné</SelectItem>
                  <SelectItem value="lost">Perdu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Notes internes</h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez vos notes ici..."
                rows={6}
                className="mb-4"
              />
              <Button
                onClick={handleSaveNotes}
                disabled={updateNotes.isPending}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {updateNotes.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <a href={`mailto:${lead.email}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un email
                  </Button>
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
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
