import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/Magnetic";
import { TextReveal } from "@/components/animations/TextReveal";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: "url('https://i.ibb.co/C5rcPJHz/titostyle-53.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Agence de Mannequins au Gabon
            </span>
          </motion.div>

          <div className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            <TextReveal text="Révéler la" className="block" />
            <TextReveal text="Beauté Africaine" className="text-primary block" delay={0.2} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            Perfect Models Management accompagne les talents du Gabon vers l'excellence.
            Formation, casting et placement pour une carrière dans la mode réussie.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <Button asChild size="lg" className="text-base h-12 px-8">
                <Link to="/casting/apply">
                  Rejoindre l'agence
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg" className="text-base h-12 px-8">
                <Link to="/models">
                  Découvrir nos mannequins
                </Link>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
