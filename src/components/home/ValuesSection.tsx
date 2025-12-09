import { motion } from "framer-motion";
import { pagesContent } from "@/content/pages";
import { agencyInfo } from "@/lib/data";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ValuesSection() {
  const { introduction } = pagesContent.home;
  
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {introduction.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {introduction.text}
            </p>
            <Button asChild>
              <Link to={introduction.cta.href}>
                {introduction.cta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {agencyInfo.values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {value.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
