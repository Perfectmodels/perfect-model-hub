import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Users, GraduationCap, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const requirements = [
  "Avoir au moins 16 ans",
  "Taille minimale : 1m70 (femmes), 1m80 (hommes)",
  "Bonne présentation et hygiène",
  "Motivation et disponibilité",
  "Résider au Gabon ou être prêt(e) à s'y installer",
];

const benefits = [
  { icon: GraduationCap, title: "Formation complète", description: "Accès à notre programme de formation exclusif" },
  { icon: Users, title: "Réseau professionnel", description: "Intégrez un réseau de créateurs et partenaires" },
  { icon: Star, title: "Opportunités", description: "Participez à des défilés et shootings prestigieux" },
  { icon: Sparkles, title: "Accompagnement", description: "Suivi personnalisé tout au long de votre carrière" },
];

const Casting = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://i.ibb.co/jkztFFQV/brando-50.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6"
            >
              Rejoignez-nous
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Casting
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Vous rêvez de devenir mannequin ? Perfect Models Management recherche
              les talents de demain. Postulez dès maintenant et lancez votre carrière.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="text-base h-12 px-8">
                <Link to="/casting/apply">
                  Postuler maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Critères de sélection
              </h2>
              <p className="text-muted-foreground mb-8">
                Pour postuler, vous devez répondre aux critères suivants. Ces exigences
                nous permettent de garantir un encadrement adapté à chaque talent.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <img
                src="https://i.ibb.co/b5NYjLqm/brando-39.jpg"
                alt="Casting"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Pourquoi rejoindre PMM ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              En intégrant notre agence, vous bénéficiez d'un accompagnement complet
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-xl bg-card border border-border"
              >
                <div className="h-14 w-14 rounded-xl bg-accent flex items-center justify-center text-foreground mx-auto mb-6">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              Prêt(e) à nous rejoindre ?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Remplissez notre formulaire de candidature et notre équipe vous recontactera
              dans les plus brefs délais.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base h-12 px-8">
              <Link to="/casting/apply">
                Remplir le formulaire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Casting;
