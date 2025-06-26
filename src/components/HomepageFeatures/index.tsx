import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link?: string;
};

type ModuleCategory = {
  title: string;
  description: string;
  icon: string;
  modules: string[];
};

const HeroFeatures: FeatureItem[] = [
  {
    title: 'Premium Magento 2 Modules',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Professional-grade Magento 2 extensions designed to enhance your e-commerce store's functionality, 
        performance, and user experience. Built with best practices and extensive testing.
      </>
    ),
  },
  {
    title: 'Comprehensive Documentation',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Detailed installation guides, configuration tutorials, and API documentation for every module. 
        Step-by-step instructions to get you up and running quickly.
      </>
    ),
  },
  {
    title: 'Expert Support',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Get professional support from Magento 2 experts. Technical assistance, customization help, 
        and ongoing maintenance for all your module needs.
      </>
    ),
  },
];

const ModuleCategories: ModuleCategory[] = [
  {
    title: 'Payment & Checkout',
    description: 'Streamline your checkout process with advanced payment solutions',
    icon: '💳',
    modules: ['Advanced Payment Gateway', 'One-Click Checkout', 'Payment Security Suite']
  },
  {
    title: 'Customer Experience',
    description: 'Enhance customer satisfaction with personalized features',
    icon: '👥',
    modules: ['Customer Loyalty Program', 'Advanced Reviews', 'Personalized Recommendations']
  },
  {
    title: 'Inventory & Shipping',
    description: 'Optimize your inventory management and shipping operations',
    icon: '📦',
    modules: ['Smart Inventory Manager', 'Multi-Warehouse Support', 'Advanced Shipping Rules']
  },
  {
    title: 'Marketing & SEO',
    description: 'Boost your store\'s visibility and marketing effectiveness',
    icon: '📈',
    modules: ['SEO Optimizer Pro', 'Email Marketing Suite', 'Social Media Integration']
  },
  {
    title: 'Analytics & Reporting',
    description: 'Gain insights into your store\'s performance and customer behavior',
    icon: '📊',
    modules: ['Advanced Analytics Dashboard', 'Customer Behavior Tracker', 'Sales Performance Reports']
  },
  {
    title: 'Security & Compliance',
    description: 'Protect your store and ensure regulatory compliance',
    icon: '🔒',
    modules: ['Security Scanner Pro', 'GDPR Compliance Suite', 'Fraud Detection System']
  }
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {link && (
          <a href={link} className="button button--primary button--lg">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
}

function ModuleCategory({title, description, icon, modules}: ModuleCategory) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.categoryIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <ul className={styles.moduleList}>
          {modules.map((module, idx) => (
            <li key={idx}>{module}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2">Ready to Transform Your Magento 2 Store?</Heading>
            <p className={styles.ctaDescription}>
              Explore our comprehensive collection of professional Magento 2 modules 
              and take your e-commerce business to the next level.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/docs/intro" className="button button--primary button--lg">
                Browse Documentation
              </a>
              <a href="/blog" className="button button--secondary button--lg">
                Read Latest Updates
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className="row">
          <div className="col col--3 text--center">
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Premium Modules</div>
          </div>
          <div className="col col--3 text--center">
            <div className={styles.statNumber}>1000+</div>
            <div className={styles.statLabel}>Happy Customers</div>
          </div>
          <div className="col col--3 text--center">
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Expert Support</div>
          </div>
          <div className="col col--3 text--center">
            <div className={styles.statNumber}>99.9%</div>
            <div className={styles.statLabel}>Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      {/* Hero Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            <div className="col col--12 text--center">
              <Heading as="h2">Why Choose Our Magento 2 Modules?</Heading>
              <p className={styles.sectionDescription}>
                Professional, reliable, and feature-rich extensions designed to enhance your e-commerce success
              </p>
            </div>
          </div>
          <div className="row">
            {HeroFeatures.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Module Categories Section */}
      <section className={styles.moduleCategories}>
        <div className="container">
          <div className="row">
            <div className="col col--12 text--center">
              <Heading as="h2">Module Categories</Heading>
              <p className={styles.sectionDescription}>
                Explore our comprehensive range of Magento 2 modules organized by functionality
              </p>
            </div>
          </div>
          <div className="row">
            {ModuleCategories.map((props, idx) => (
              <ModuleCategory key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
