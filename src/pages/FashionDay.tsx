import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Star, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fashionDayEvents } from "@/lib/data";

const FashionDay = () => {
  const upcomingEvent = fashionDayEvents.find((e) => e.edition === 2);
  const pastEvents = fashionDayEvents.filter((e) => e.edition === 1);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${upcomingEvent?.imageUrl}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="text-sm">
                <Star className="h-4 w-4 mr-1" />
                Édition {upcomingEvent?.edition}
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Perfect Fashion Day
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl text-primary font-serif mb-6"
            >
              {upcomingEvent?.theme}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg mb-8"
            >
              {upcomingEvent?.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{upcomingEvent?.date}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{upcomingEvent?.location}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button asChild size="lg" className="text-base h-12 px-8">
                <Link to="/fashion-day/apply">
                  Participer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Edition */}
      {pastEvents.length > 0 && (
        <section className="py-20 lg:py-32 bg-card border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Éditions précédentes
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Retour sur les moments forts de nos événements passés
              </p>
            </motion.div>

            {pastEvents.map((event, index) => (
              <motion.div
                key={event.edition}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={`Perfect Fashion Day Édition ${event.edition}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-4">
                    Édition {event.edition}
                  </Badge>
                  <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
                    {event.theme}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

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
              Participez à l'événement
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Mannequin, styliste, photographe ou partenaire ? Rejoignez-nous pour la prochaine édition du Perfect Fashion Day.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/fashion-day/apply">
                Postuler maintenant
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FashionDay;
