import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UserPlus, Sparkles, Camera, GraduationCap, Palette, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-8 w-8" />,
  UserPlus: <UserPlus className="h-8 w-8" />,
  Sparkles: <Sparkles className="h-8 w-8" />,
  Camera: <Camera className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Palette: <Palette className="h-8 w-8" />,
};

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Nos Services
            </h1>
            <p className="text-lg text-muted-foreground">
              Un accompagnement complet pour vos projets mode, événementiel et communication visuelle
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center text-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {iconMap[service.icon]}
                </div>
                
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {service.category}
                </span>
                
                <h3 className="font-serif text-2xl font-semibold text-foreground mt-2 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/contact?service=${service.title}`}>
                    Demander un devis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
              Besoin d'un service personnalisé ?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Contactez-nous pour discuter de vos besoins spécifiques et obtenir une proposition sur mesure.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
