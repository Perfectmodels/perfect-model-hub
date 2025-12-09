import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pagesContent } from "@/content/pages";

export function CTASection() {
  const { cta } = pagesContent.home;
  
  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {cta.title}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base h-12 px-8"
            >
              <Link to={cta.ctaPrimary.href}>
                {cta.ctaPrimary.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to={cta.ctaSecondary.href}>
                {cta.ctaSecondary.text}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
